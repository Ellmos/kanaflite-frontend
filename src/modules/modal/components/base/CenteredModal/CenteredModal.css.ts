import { StyleSheet } from 'react-native-unistyles';

const CenteredModalStyles = StyleSheet.create((theme) => ({
  positioner: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    minHeight: 200,
    width: '95%',
    padding: theme.spacings.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background.default,
    display: 'flex',
    justifyContent: 'flex-start',
  },
}));

export default CenteredModalStyles;
