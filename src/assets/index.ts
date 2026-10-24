export const Images = {
  kanaflite: require('./images/kanaflite.png'),
};

export const TfliteModels = {
  Hiraganas: {
    AllDakuten: {
      model: require('./models/Hiraganas/AllDakuten/V1.tflite'),
      classmap: require('./models/Hiraganas/AllDakuten/V1.classmap'),
    },
  },
};
