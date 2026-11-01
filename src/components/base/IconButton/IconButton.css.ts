import { StyleSheet } from 'react-native-unistyles';

const IconButtonStyles = StyleSheet.create((theme) => ({
  button: {
    padding: 10,
    borderRadius: 8,
    variants: {
      highlighted: {
        true: {
          backgroundColor: theme.colors.background.light,
        },
        false: {
          backgroundColor: theme.colors.background.light,
        },
      },
      disabled: {
        true: {
          opacity: 0.4,
        },
        false: {
          opacity: 1,
        },
      },
    },
  },
  icon: {
    variants: {
      highlighted: {
        true: {
          color: theme.colors.text.default,
        },
        false: {
          color: theme.colors.text.muted,
        },
      },
    },
  },
}));

export default IconButtonStyles;
