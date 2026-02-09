import { ConfigContext, ExpoConfig } from 'expo/config';
import 'ts-node/register';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Kanaflite',
  slug: 'kanaflite',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/kanaflite.png',
  buildCacheProvider: 'eas',
  splash: {
    image: './assets/kanaflite.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  android: {
    package: 'com.kanaflite.kanaflite',
    adaptiveIcon: {
      foregroundImage: './assets/kanaflite.png',
      backgroundColor: '#ffffff',
    },
  },
  ios: {
    bundleIdentifier: 'com.kanaflite.kanaflite',
  },
  extra: {
    eas: {
      projectId: 'ebb22ca5-3d72-477e-8b61-58867b7c61d3',
    },
  },
  plugins: ['react-native-fast-tflite', 'expo-font'],
});
