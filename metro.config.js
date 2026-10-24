import { getDefaultConfig } from 'expo/metro-config';

const expoConfig = getDefaultConfig(__dirname);

/** @type {import('expo/metro-config').MetroConfig} */
const config = {
  ...expoConfig,
  resolver: {
    ...expoConfig.resolver,
    assetExts: [...expoConfig.resolver.assetExts, 'tflite', 'classmap'],
  },
};

export default config;
