import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import SignatureView, { SignatureViewRef } from 'react-native-signature-canvas';

import IconButton from '@components/base/IconButton';

const CANVAS_SIZE = 300;
const PEN_SIZE = 6;

type CanvasProps = {
  onValidateDrawing: (drawing: string) => void;
};

const Canvas = ({ onValidateDrawing }: CanvasProps) => {
  const canvasRef = useRef<SignatureViewRef>(null);

  const [currStroke, setCurrStroke] = useState(0);

  const clearCanvas = () => {
    canvasRef.current?.clearSignature();
    setCurrStroke(0);
  };

  const registerNewStroke = () => {
    const newCurrStroke = currStroke + 1;
    setCurrStroke(newCurrStroke);
  };

  const handleOk = async (drawing: string) => {
    clearCanvas();
    onValidateDrawing(drawing);
  };

  return (
    <View style={styles.container}>
      <View style={styles.canvasWrapper}>
        <SignatureView
          ref={canvasRef}
          onEnd={registerNewStroke}
          onOK={handleOk}
          autoClear={false}
          webStyle={webStyle}
          penColor='#FFF'
          minWidth={PEN_SIZE}
          maxWidth={PEN_SIZE}
          backgroundColor='#000'
          // style={{ backgroundColor: 'red' }}
        />
      </View>

      <View style={styles.buttons}>
        <IconButton icon='rotate-left' onPress={() => canvasRef.current?.undo()} />
        <IconButton icon='send' onPress={() => canvasRef.current?.readSignature()} />
      </View>
    </View>
  );
};

export default Canvas;

const webStyle = `
  .m-signature-pad {
    border: none;
  }

  .m-signature-pad--body {
    border: none;
  }

  .m-signature-pad--body canvas {
    background-color: #000;
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
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  buttons: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 20,
  },
});
