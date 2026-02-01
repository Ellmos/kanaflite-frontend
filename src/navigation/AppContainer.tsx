import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';

import { Images } from '@assets/Images';
import SplashScreen from '@screens/SplashScreen';

import RootNavigator from './navigators/RootNavigator';

export default function AppContainer() {
  const scheme = useColorScheme();

  const [isLoading, setIsLoading] = useState(true);

  async function loadResources() {
    const loadAssetsAsync = async () => {
      const imageAssetsPromises = Object.values(Images).map((image) =>
        Asset.fromModule(image).downloadAsync(),
      );

      return Promise.all(imageAssetsPromises);
    };

    await Promise.all([loadAssetsAsync(), Font.loadAsync(Ionicons.font)]);
  }

  useEffect(() => {
    (async () => {
      try {
        await loadResources();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <StatusBar style={scheme == 'dark' ? 'dark' : 'light'} />
      <RootNavigator />
    </NavigationContainer>
  );
}
