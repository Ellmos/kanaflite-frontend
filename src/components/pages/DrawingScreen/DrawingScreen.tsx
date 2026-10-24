import { useState, useEffect } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';

import { useAssets } from 'expo-asset';
import { TensorflowModel, loadTensorflowModel } from 'react-native-fast-tflite';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TfliteModels } from '@assets/index';
import Typography from '@components/base/Typography';
import { runTfliteInference } from '@lib/tflite';

import Canvas from './Canvas';
import DrawingScreenStyles from './DrawingScreen.css';

const DrawingScreen = () => {
  const [model, setModel] = useState<TensorflowModel | null>(null);
  const [classmap, setClassmap] = useState<string[]>([]);
  const [drawing, setDrawing] = useState<string | null>(null);

  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [assets, error] = useAssets([TfliteModels.Hiraganas.AllDakuten.classmap]);

  useEffect(() => {
    if (error) {
      console.error('Error loading assets:', error);
      return;
    }
  }, [error, assets]);

  useEffect(() => {
    async function loadModel() {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1));

      loadTensorflowModel(TfliteModels.Hiraganas.AllDakuten.model, []).then(setModel);
    }

    const loadClassmap = async () => {
      if (!assets) return;
      const classmapAsset = assets[0];
      if (!classmapAsset) return;

      const response = await fetch(classmapAsset.localUri!);
      const text = await response.text();
      const lines = text.split('\n').filter((line) => line.trim() !== '');
      setClassmap(lines);
    };

    Promise.all([loadModel(), loadClassmap()]).finally(() => setLoading(false));
  }, [assets]);

  const onValidateDrawing = async (drawing: string) => {
    setDrawing(drawing);

    const { prediction, confidence } = await runTfliteInference(model!, classmap, drawing);
    console.log('confidence:', confidence, 'prediction:', prediction);
    if (confidence < 0.8) {
      setPrediction('ヽ(｀Д´)ﾉ');
    } else {
      setPrediction(prediction);
    }
  };

  console.log('prediction:', prediction);

  if (loading) {
    return (
      <SafeAreaView style={DrawingScreenStyles.container}>
        <ActivityIndicator size='large' />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={DrawingScreenStyles.container}>
      {drawing && (
        <View style={{ backgroundColor: 'white' }}>
          <Image source={{ uri: drawing }} style={DrawingScreenStyles.preview} resizeMode='contain' />
        </View>
      )}

      {prediction && (
        <View style={{ height: 40 }}>
          <Typography style={{ fontSize: 24 }}>Prediction: {prediction}</Typography>
        </View>
      )}

      <Canvas onValidateDrawing={onValidateDrawing} />
    </SafeAreaView>
  );
};

export default DrawingScreen;
