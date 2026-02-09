import { ConfigContext, ExpoConfig } from 'expo/config';
import 'ts-node/register';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Kanaflite',
  slug: 'Kanaflite',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/kanaflite.png',
  splash: {
    image: './assets/kanaflite.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  android: {
    package: 'com.kanaflite.kanaflite',
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: './assets/kanaflite.png',
      backgroundColor: '#ffffff',
    },
  },
  ios: {
    bundleIdentifier: 'com.kanaflite.kanaflite',
  },
  plugins: ['react-native-fast-tflite', 'expo-font'],
});
