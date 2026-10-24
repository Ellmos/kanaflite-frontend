import { StatusBar, useColorScheme } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import RootNavigator from '@navigation/navigators/RootNavigator';

const AppLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer>
      <StatusBar barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
      <RootNavigator />
    </NavigationContainer>
  );
};

export default AppLayout;
