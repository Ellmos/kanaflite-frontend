import { View, Text } from 'react-native';

import SplashScreenStyles from './SplashScreen.css';

const SplashScreen = () => {
  return (
    <View style={SplashScreenStyles.wrapper}>
      <Text style={SplashScreenStyles.text}>This is the splash screen ma gueule</Text>
    </View>
  );
};

export default SplashScreen;
