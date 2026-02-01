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
            '@assets': './assets',
            '@constants': './src/constants',
            '@definitions': './src/definitions',
            '@hooks': './src/hooks',
            '@navigation': './src/navigation',
            '@screens': './src/screens',
          },
        },
      ],
    ],
  };
};
