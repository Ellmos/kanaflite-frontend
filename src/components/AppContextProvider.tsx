import type { PropsWithChildren } from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { store } from '@store/store';

type AppContextProviderProps = PropsWithChildren;
const AppContextProvider = ({ children }: AppContextProviderProps) => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>{children}</Provider>
    </SafeAreaProvider>
  );
};

export default AppContextProvider;
