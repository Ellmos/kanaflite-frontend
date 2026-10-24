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
            '@': './src',
            '@assets': './src/assets',
            '@components': './src/components',
            '@constants': './src/constants',
            '@hooks': './src/hooks',
            '@lib': './src/lib',
            '@navigation': './src/navigation',
            '@styles': './src/styles',
            '@type': './src/types',
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
