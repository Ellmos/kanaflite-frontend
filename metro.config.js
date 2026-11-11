import { getDefaultConfig } from 'expo/metro-config.js';

const expoConfig = getDefaultConfig(process.cwd());

const config = {
  ...expoConfig,
  resolver: {
    ...expoConfig.resolver,
    assetExts: [...expoConfig.resolver.assetExts, 'tflite', 'classmap'],
  },
};

export default config;
