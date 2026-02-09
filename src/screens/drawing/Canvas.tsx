import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import SignatureView, { SignatureViewRef } from 'react-native-signature-canvas';

import ActionButton from './ActionButton';
import Toolbar from './Toolbar';

const CANVAS_SIZE = 300;

type CanvasProps = {
  onValidateDrawing: (drawing: string) => void;
};

export default function Canvas({ onValidateDrawing }: CanvasProps) {
  const canvasRef = useRef<SignatureViewRef>(null);

  const [mode, setMode] = useState<'draw' | 'erase'>('draw');
  const [currStroke, setCurrStroke] = useState(0);
  const [maxStroke, setMaxStroke] = useState(0);

  const clearCanvas = () => {
    canvasRef.current?.clearSignature();
    setCurrStroke(0);
    setMaxStroke(0);
  };

  const registerNewStroke = () => {
    const newCurrStroke = currStroke + 1;
    setCurrStroke(newCurrStroke);
    setMaxStroke((prev) => Math.max(prev, newCurrStroke));
  };

  const handleOk = async (drawing: string) => {
    clearCanvas();
    onValidateDrawing(drawing);
  };

  return (
    <View style={styles.container}>
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
          onEnd={registerNewStroke}
          onOK={handleOk}
          autoClear={false}
          webStyle={webStyle}
          penColor="#000"
          minWidth={9}
          maxWidth={9}
          backgroundColor="transparent"
        />
      </View>

      <View style={styles.buttons}>
        <ActionButton icon="trash" onPress={clearCanvas} />
        <ActionButton icon="send" onPress={() => canvasRef.current?.readSignature()} />
      </View>
    </View>
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
