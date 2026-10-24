import { StyleSheet } from 'react-native-unistyles';

const SplashScreenStyles = StyleSheet.create((theme) => ({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: theme.fonts.sizes.md,
    color: theme.colors.text.default,
  },
}));

export default SplashScreenStyles;
