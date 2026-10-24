import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Kanaflite',
  slug: 'kanaflite',
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'automatic',
  icon: './src/assets/images/kanaflite.png',
  buildCacheProvider: 'eas',
  // splash: {
  //   image: './assets/kanaflite.png',
  //   resizeMode: 'contain',
  //   backgroundColor: '#ffffff',
  // },
  android: {
    package: 'com.kanaflite.kanaflite',
    adaptiveIcon: {
      foregroundImage: './src/assets/images/kanaflite.png',
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
  plugins: [
    [
      'react-native-fast-tflite',
      {
        enableAndroidGpuLibraries: true,
        enableCoreMLDelegate: true,
      },
    ],
    'expo-font',
    'expo-asset',
    'expo-status-bar',
    'expo-system-ui',
  ],
});
