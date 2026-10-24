import AppContextProvider from './components/AppContextProvider';
import AppInitilizer from './components/AppInitializer';

export default function App() {
  return (
    <AppContextProvider>
      <AppInitilizer />
    </AppContextProvider>
  );
}
