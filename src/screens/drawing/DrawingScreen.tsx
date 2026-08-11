import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';

import { Asset } from 'expo-asset';
import { File } from 'expo-file-system';
import { loadTensorflowModel, TensorflowModel } from 'react-native-fast-tflite';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Assets } from '@assets/Assets';
import Kanas from '@constants/kanas';
import { runModel } from 'services/tflite';

import Canvas from './Canvas';

export default function DrawingScreen() {
  const [model, setModel] = useState<TensorflowModel | null>(null);
  const [classmap, setClassmap] = useState<string[]>([]);
  const [drawing, setDrawing] = useState<string | null>(null);

  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [goal, setGoal] = useState<string>('');

  const kanas = useMemo(
    () =>
      Kanas.getKanas({
        withDakuten: true,
        withHandakuten: true,
        inverted: false,
      }),
    [],
  );

  const getRandomGoal = useCallback(() => {
    if (classmap.length <= 0 || !kanas) return;

    console.log(kanas);

    const randomGoal = 'か';
    const kana = kanas.get(randomGoal);

    // console.log(randomGoal, randomGoal.length);
    // console.log([...randomGoal].map(c => c.codePointAt(0).toString(16)));
    //
    // for (const key of kanas.keys()) {
    //   if (key.includes("か")) {
    //     console.log("Map key:", key, [...key].map(c => c.codePointAt(0).toString(16)));
    //   }
    // }
    if (!kana) {
      throw new Error(`Kana not found for class ${randomGoal}`);
    }
    setGoal(kana);
  }, [classmap, kanas]);

  useEffect(() => {
    getRandomGoal();
  }, [getRandomGoal]);

  useEffect(() => {
    async function loadModel() {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1));

      const model = await loadTensorflowModel(Assets.V1model);
      setModel(model);
    }

    async function loadClassmap() {
      const asset = Asset.fromModule(Assets.V1classmap);
      await asset.downloadAsync();
      if (!asset.localUri) {
        throw new Error('Failed to load classmap asset');
      }

      const file = new File(asset.localUri);
      const text = await file.text();

      const lines = text.split('\n');
      setClassmap(lines);
    }

    Promise.all([loadModel(), loadClassmap()]).finally(() => setLoading(false));
  }, []);

  async function onValidateDrawing(drawing: string) {
    setDrawing(drawing);

    const { prediction, confidence } = await runModel(model!, classmap, drawing);
    if (confidence < 0.8) {
      setPrediction('ヽ(｀Д´)ﾉ');
    } else {
      setPrediction(prediction);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 24 }}>Draw</Text>
        <Text style={{ fontSize: 16 }}>{goal}</Text>
      </View>
      {drawing && <Image source={{ uri: drawing }} style={styles.preview} resizeMode="contain" />}

      {prediction && (
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 24 }}>Prediction: {prediction}</Text>
        </View>
      )}

      <Canvas onValidateDrawing={onValidateDrawing} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    width: 200,
    height: 80,
    marginBottom: 16,
  },
});
