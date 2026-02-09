import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { useTensorflowModel } from 'react-native-fast-tflite';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignatureView, { SignatureViewRef } from 'react-native-signature-canvas';

import { Assets } from '@assets/Assets';
import { preprocessSignatureForTFLite } from 'services/ImageProcessor';

import ActionButton from './ActionButton';
import Toolbar from './Toolbar';

const CANVAS_SIZE = 300;

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

  const canvasRef = useRef<SignatureViewRef>(null);

  const [signature, setSignature] = useState<string | null>(null);
  const [mode, setMode] = useState<'draw' | 'erase'>('draw');
  const [currStroke, setCurrStroke] = useState(0);
  const [maxStroke, setMaxStroke] = useState(0);

  const [prediction, setPrediction] = useState<string | null>(null);

  const handleSend = () => {
    canvasRef.current?.readSignature();
  };

  const handleClear = () => {
    canvasRef.current?.clearSignature();
    setCurrStroke(0);
    setMaxStroke(0);
  };

  const handleNewStroke = () => {
    const newCurrStroke = currStroke + 1;
    setCurrStroke(newCurrStroke);
    setMaxStroke((prev) => Math.max(prev, newCurrStroke));
  };

  const handleOk = async (signature: string) => {
    setSignature(signature);
    handleClear();

    try {
      const imageSize = 50; // or whatever your model expects

      const { input } = await preprocessSignatureForTFLite(signature, imageSize);

      if (plugin.state !== 'loaded') {
        console.error('Model not loaded yet');
        return;
      }

      console.log(input);
      const a = await plugin.model.run([input]);
      console.log('TFLite output:', a[0]);

      const indexMax = a[0].indexOf(Math.max(...a[0]));
      console.log('Predicted class:', classmap[indexMax], 'with confidence', a[0][indexMax]);
      setPrediction(classmap[indexMax]);
    } catch (err) {
      console.error(err);
    }

    handleClear();
  };

  return (
    <SafeAreaView style={styles.container}>
      {signature && (
        <Image source={{ uri: signature }} style={styles.preview} resizeMode="contain" />
      )}

      {prediction && (
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 24 }}>Prediction: {prediction}</Text>
        </View>
      )}

      <Toolbar
        mode={mode}
        currStroke={currStroke}
        maxStroke={maxStroke}
        onUndo={() => {
          canvasRef.current?.undo();
          setCurrStroke((prev) => prev - 1);
        }}
        onRedo={() => {
          canvasRef.current?.redo();
          setCurrStroke((prev) => prev + 1);
        }}
        onDraw={() => {
          canvasRef.current?.draw();
          canvasRef.current?.changePenSize(9, 9);
          setMode('draw');
        }}
        onErase={() => {
          canvasRef.current?.erase();
          canvasRef.current?.changePenSize(9, 9);
          setMode('erase');
        }}
      />

      <View style={styles.canvasWrapper}>
        <SignatureView
          ref={canvasRef}
          onEnd={handleNewStroke}
          onOK={(signature) => handleOk(signature)}
          onBegin={() => setCurrStroke((prev) => prev + 1)}
          autoClear={false}
          webStyle={webStyle}
          penColor="#000"
          minWidth={9}
          maxWidth={9}
          backgroundColor="transparent"
        />
      </View>

      <View style={styles.buttons}>
        <ActionButton icon="trash" onPress={handleClear} />
        <ActionButton icon="send" onPress={handleSend} />
      </View>
    </SafeAreaView>
  );
}

const webStyle = `
  .m-signature-pad {
    box-shadow: none;
    border: none;
  }
  .m-signature-pad--footer {
    display: none;
  }
  canvas {
    width: ${CANVAS_SIZE}px !important;
    height: ${CANVAS_SIZE}px !important;
  }
`;

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
  canvasWrapper: {
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
    backgroundColor: '#FFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttons: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 20,
  },
});
