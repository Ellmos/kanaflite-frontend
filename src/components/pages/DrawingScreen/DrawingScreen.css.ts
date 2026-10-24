import { StyleSheet } from 'react-native-unistyles';

const DrawingScreenStyles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background.default,
  },
  preview: {
    width: 200,
    height: 80,
    marginBottom: 16,
  },
}));

export default DrawingScreenStyles;
