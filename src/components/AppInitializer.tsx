import { useEffect, useState } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

import { Images } from '@assets/index';
import AppLayout from '@components/AppLayout';
import SplashScreen from '@components/pages/SplashScreen';

const AppInitilizer = () => {
  const [isLoading, setIsLoading] = useState(true);

  async function loadResources() {
    const loadAssetsAsync = async () => {
      const imageAssetsPromises = Object.values(Images).map((image) => Asset.fromModule(image).downloadAsync());

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

  return <AppLayout />;
};

export default AppInitilizer;
