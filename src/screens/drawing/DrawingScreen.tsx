import React, { useRef, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignatureView, { SignatureViewRef } from 'react-native-signature-canvas';

import Toolbar from './Toolbar';
import ActionButton from './ActionButton';
import { preprocessSignatureForTFLite } from 'services/ImageProcessor';

const CANVAS_SIZE = 300;

export default function DrawingScreen() {
  const canvasRef = useRef<SignatureViewRef>(null);

  const [signature, setSignature] = useState<string | null>(null);
  const [mode, setMode] = useState<'draw' | 'erase'>('draw');
  const [currStroke, setCurrStroke] = useState(0);
  const [maxStroke, setMaxStroke] = useState(0);

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

      const { input, shape } = await preprocessSignatureForTFLite(signature, imageSize);

      // console.log('TFLite input:', input);
      // console.log('Shape:', shape);

      // Pass to TFLite here
      // await model.run([{ data: input, shape, type: 'float32' }]);
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
          canvasRef.current?.changePenSize(3, 3);
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
          minWidth={3}
          maxWidth={3}
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
