import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';

import { useTensorflowModel } from 'react-native-fast-tflite';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Assets } from '@assets/Assets';
import { runModel } from 'services/tflite';

import Canvas from './Canvas';

const classmap = [
  'あ',
  'い',
  'う',
  'え',
  'お',
  'か',
  'き',
  'く',
  'け',
  'こ',
  'さ',
  'し',
  'す',
  'せ',
  'そ',
  'た',
  'ち',
  'つ',
  'て',
  'と',
  'な',
  'に',
  'ぬ',
  'ね',
  'の',
  'は',
  'ひ',
  'ふ',
  'へ',
  'ほ',
  'ま',
  'み',
  'む',
  'め',
  'も',
  'や',
  'ゆ',
  'よ',
  'ら',
  'り',
  'る',
  'れ',
  'ろ',
  'わ',
  'を',
  'ん',
  'が',
  'ぎ',
  'ぐ',
  'げ',
  'ご',
  'ざ',
  'じ',
  'ず',
  'ぜ',
  'ぞ',
  'だ',
  'ぢ',
  'づ',
  'で',
  'ど',
  'ば',
  'び',
  'ぶ',
  'べ',
  'ぼ',
  'ぱ',
  'ぴ',
  'ぷ',
  'ぺ',
  'ぽ',
  'Ø',
];

export default function DrawingScreen() {
  const plugin = useTensorflowModel(Assets.V1);

  const [drawing, setDrawing] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);

  async function onValidateDrawing(drawing: string) {
    setDrawing(drawing);

    const { prediction, confidence } = await runModel(plugin.model!, classmap, drawing);
    console.log('Predicted class:', prediction, 'with confidence', confidence);
    if (confidence < 0.8) {
      setPrediction('ヽ(｀Д´)ﾉ');
    } else {
      setPrediction(prediction);
    }
  }

  if (plugin.state === 'loading') {
    return <ActivityIndicator />;
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
