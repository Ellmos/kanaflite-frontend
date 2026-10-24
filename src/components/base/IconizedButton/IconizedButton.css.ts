import { StyleSheet } from 'react-native-unistyles';

const IconizedButtonStyles = StyleSheet.create((theme) => ({
  wrapper: {
    backgroundColor: theme.colors.background.light,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: theme.colors.border,
    elevation: 2,
  },
  title: {
    color: theme.colors.text.default,
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    color: theme.colors.text.muted,
    fontSize: 14,
  },
  icon: {
    marginRight: 12,
    padding: 10,
    borderRadius: 10,
  },
}));

export default IconizedButtonStyles;
