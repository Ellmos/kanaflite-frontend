const { getDefaultConfig } = require('expo/metro-config');

const expoConfig = getDefaultConfig(__dirname);

const config = {
  ...expoConfig,
  resolver: {
    ...expoConfig.resolver,
    assetExts: [...expoConfig.resolver.assetExts, 'tflite'],
  },
};

module.exports = config;
