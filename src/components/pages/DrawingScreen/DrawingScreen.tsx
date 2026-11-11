import { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useAssets } from 'expo-asset';
import { TensorflowModel, loadTensorflowModel } from 'react-native-fast-tflite';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TfliteModels } from '@assets/index';
import Typography from '@components/base/Typography';
import Canvas from '@components/business/Canvas';
import Kanas from '@constants/kanas';
import { runTfliteInference } from '@lib/tflite';
import { openModalRequested } from '@modal/core/slice';
import { ModalNotification, ModalVariant } from '@modal/type';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectPractiveSelection } from '@store/slices/practice';
import { randomInArray } from '@utils/array';

import DrawingScreenStyles from './DrawingScreen.css';

const DrawingScreen = () => {
  const selection = useAppSelector(selectPractiveSelection);

  const getNextTarget = useCallback(() => {
    return randomInArray(selection);
  }, [selection]);

  const [target, setTarget] = useState<string>(getNextTarget);

  const [model, setModel] = useState<TensorflowModel | null>(null);
  const [classmap, setClassmap] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  // Load both assets through Expo Asset
  const [assets, assetError] = useAssets([
    TfliteModels.Hiraganas.AllDakuten.classmap,
    TfliteModels.Hiraganas.AllDakuten.model,
  ]);

  useEffect(() => {
    let cancelled = false;

    async function initialize() {
      try {
        setLoading(true);
        setErrorMessage(null);

        // Check Expo Asset errors
        if (assetError) {
          throw new Error(`Asset loading error: ${assetError.message}`);
        }

        if (!assets) {
          return;
        }

        const classmapAsset = assets[0];
        const modelAsset = assets[1];

        // Validate classmap asset
        if (!classmapAsset?.localUri) {
          throw new Error('The classmap file is unavailable.');
        }

        // Validate TensorFlow model asset
        if (!modelAsset?.localUri) {
          throw new Error('The TensorFlow model file is unavailable.');
        }

        // Load classmap
        const response = await fetch(classmapAsset.localUri);

        if (!response.ok) {
          throw new Error('Unable to retrieve the classmap.');
        }

        const text = await response.text();

        const lines = text
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line.length > 0);

        if (lines.length === 0) {
          throw new Error('The classmap is empty.');
        }

        // Load TensorFlow Lite model using its local file URI
        const loadedModel = await loadTensorflowModel({ url: modelAsset.localUri }, []);

        if (!loadedModel) {
          throw new Error('Unable to load the TensorFlow Lite model.');
        }

        if (!cancelled) {
          setClassmap(lines);
          setModel(loadedModel);
        }
      } catch (error) {
        console.error('Initialization error:', error);

        if (!cancelled) {
          setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    initialize();

    return () => {
      cancelled = true;
    };
  }, [assets, assetError]);

  const onValidateDrawing = async (drawing: string) => {
    try {
      if (!model) {
        throw new Error('The TensorFlow model is unavailable.');
      }

      if (classmap.length === 0) {
        throw new Error('The classmap is unavailable.');
      }

      const { prediction, confidence } = await runTfliteInference(model, classmap, drawing);

      console.log('confidence:', confidence, 'prediction:', prediction);

      const currentTarget = target;
      setTarget(getNextTarget());

      const modalNotification: ModalNotification = {
        variant: ModalVariant.DrawingResult,
        payload: {
          target: currentTarget,
          predicted: prediction,
        },
      };

      dispatch(openModalRequested(modalNotification));
    } catch (error) {
      console.error('Inference error:', error);

      setErrorMessage(error instanceof Error ? error.message : 'An error occurred during drawing recognition.');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={DrawingScreenStyles.container}>
        <ActivityIndicator size='large' />
        <Typography>Chargement du modèle...</Typography>
      </SafeAreaView>
    );
  }

  if (errorMessage) {
    return (
      <SafeAreaView style={DrawingScreenStyles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24,
          }}
        >
          <Typography style={{ fontSize: 22, marginBottom: 16 }}>Une erreur est survenue</Typography>

          <Typography style={{ textAlign: 'center', color: 'red' }}>{errorMessage}</Typography>
        </View>
      </SafeAreaView>
    );
  }

  const targetLatin = Kanas.getLatinFromKana(target);

  return (
    <SafeAreaView style={DrawingScreenStyles.container}>
      <View style={{ height: 40, marginTop: 40 }}>
        <Typography style={{ fontSize: 24 }}>Target: {targetLatin}</Typography>
      </View>

      <Canvas onValidateDrawing={onValidateDrawing} />
    </SafeAreaView>
  );
};

export default DrawingScreen;
