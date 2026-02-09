import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import { PNG } from 'pngjs/browser';
import { Buffer } from 'buffer';

export async function preprocessSignatureForTFLite(
  signatureBase64: string,
  imageSize: number,
): Promise<{
  input: Float32Array;
  shape: [number, number, number, number];
}> {
  // 1. Resize image
  const context = ImageManipulator.manipulate(signatureBase64).resize({
    width: imageSize,
    height: imageSize,
  });

  const imageRef = await context.renderAsync();
  const image = await imageRef.saveAsync({
    format: SaveFormat.PNG,
    base64: true,
  });

  if (!image.base64) {
    throw new Error('Failed to get base64 image data');
  }

  // 2. Decode PNG
  const pngBuffer = Buffer.from(image.base64, 'base64');
  const png = PNG.sync.read(pngBuffer);

  const { width, height, data } = png;
  console.log(data.length);

  if (width !== imageSize || height !== imageSize) {
    throw new Error('Unexpected image dimensions after resize');
  }

  // 3. RGB → grayscale + normalize
  // data is [R, G, B, A, R, G, B, A, ...]
  const input = new Float32Array(width * height);

  let idx = 0;
  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3];
    const gray = alpha / 255.0;

    input[idx++] = gray;
  }

  return {
    input,
    shape: [1, imageSize, imageSize, 1],
  };
}
