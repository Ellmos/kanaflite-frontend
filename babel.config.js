module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@constants': './src/constants',
            '@hooks': './src/hooks',
            '@lib': './src/lib',
            '@navigation': './src/navigation',
            '@store': './src/store',
            '@styles': './src/styles',
            '@type': './src/types',
            '@utils': './src/utils',
          },
        },
      ],
      [
        'react-native-unistyles/plugin',
        {
          root: 'src'
        }
      ]
    ],
  };
};
