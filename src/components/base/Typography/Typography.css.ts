import { StyleSheet } from 'react-native-unistyles';

const TypographyStyles = StyleSheet.create((theme) => ({
  text: {
    flex: 1,
    variants: {
      color: {
        defaut: {
          color: theme.colors.text.default,
        },
        muted: {
          color: theme.colors.text.muted,
        },
      },
    },
  },
}));

export default TypographyStyles;
