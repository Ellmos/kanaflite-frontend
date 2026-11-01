import { Buffer } from 'buffer';

import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import { PNG } from 'pngjs/browser';
import { TensorflowModel } from 'react-native-fast-tflite';

const IMAGE_SIZE = 50;

// const pngToGrayscale = (png: PNG) => {
//   const { width, height, data } = png;
//   const grayscale = new Float32Array(width * height);
//
//   let idx = 0;
//   for (let i = 0; i < data.length; i += 4) {
//     const alpha = data[i + 3];
//     const gray = alpha / 255.0;
//
//     grayscale[idx++] = gray;
//   }
//
//   return grayscale;
// };
const pngToGrayscale = (png: PNG) => {
  const { width, height, data } = png;
  const grayscale = new Float32Array(width * height);

  let idx = 0;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Convert RGB to grayscale and normalize to [0, 1]
    const gray = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    grayscale[idx++] = gray;
  }

  return grayscale;
};

const prepareImageForModel = async (signatureBase64: string) => {
  // Resize image
  const imageRef = await ImageManipulator.manipulate(signatureBase64)
    .resize({
      width: IMAGE_SIZE,
      height: IMAGE_SIZE,
    })
    .renderAsync();

  const image = await imageRef.saveAsync({
    format: SaveFormat.PNG,
    base64: true,
  });

  if (!image.base64) {
    throw new Error('Failed to get base64 image data');
  }

  // Decode PNG
  const pngBuffer = Buffer.from(image.base64, 'base64');
  const png = PNG.sync.read(pngBuffer);

  // Convert to grayscale
  return pngToGrayscale(png);
};

type ModelOutput = {
  prediction: string;
  confidence: number | bigint;
};

export const runTfliteInference = async (
  model: TensorflowModel,
  classmap: string[],
  drawing: string,
): Promise<ModelOutput> => {
  const input = await prepareImageForModel(drawing);

  const out = await model.run([input.buffer]);
  const output = new Float32Array(out[0]);

  let max: number | bigint = -Infinity;
  let maxIndex = -1;
  for (let i = 0; i < output.length; i++) {
    if (output[i] > max) {
      max = output[i];
      maxIndex = i;
    }
  }

  return {
    prediction: classmap[maxIndex],
    confidence: max,
  };
};
