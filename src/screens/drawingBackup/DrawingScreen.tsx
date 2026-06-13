import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';

import { loadTensorflowModel, TensorflowModel } from 'react-native-fast-tflite';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Assets } from '@assets/Assets';
import { runModel } from 'services/tflite';

import Canvas from './Canvas';

export default function DrawingScreen() {
  const [model, setModel] = useState<TensorflowModel | null>(null);
  const [classmap, setClassmap] = useState<string[]>([]);
  const [drawing, setDrawing] = useState<string | null>(null);

  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadModel() {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1));

      loadTensorflowModel(Assets.V1model).then(setModel);
    }

    async function loadClassmap() {
      const response = await fetch(Assets.V1classmap);
      const text = await response.text();
      const lines = text.split('\n').filter((line) => line.trim() !== '');
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
