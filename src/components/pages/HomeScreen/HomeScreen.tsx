import { View, Text } from 'react-native';

import HomeScreenStyles from './HomeScreen.css';

const HomeScreen = () => {
  return (
    <View style={HomeScreenStyles.wrapper}>
      <Text style={HomeScreenStyles.text}>Home screen bitch</Text>
    </View>
  );
};

export default HomeScreen;
