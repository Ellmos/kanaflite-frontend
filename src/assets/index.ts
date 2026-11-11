export const Images = {
  kanaflite: require('./images/kanaflite.png'),
};

export const TfliteModels = {
  Hiraganas: {
    AllDakuten: {
      model: require('./models/Hiraganas/AllDakuten/V1tflite.tflite'),
      classmap: require('./models/Hiraganas/AllDakuten/V1classmap.classmap'),
    },
  },
};
