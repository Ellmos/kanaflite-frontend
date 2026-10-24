import type { PropsWithChildren } from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';

type AppContextProviderProps = PropsWithChildren;
const AppContextProvider = ({ children }: AppContextProviderProps) => {
  return <SafeAreaProvider>{children}</SafeAreaProvider>;
};

export default AppContextProvider;
