import { StyleSheet } from 'react-native-unistyles';

const DrawingResultModalStyles = StyleSheet.create((theme) => ({
  container: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: theme.spacings.md,
    paddingVertical: theme.spacings.lg,
    gap: theme.spacings.xs,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    paddingTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacings.xs,
  },

  successIcon: {
    backgroundColor: theme.colors.action.success,
  },

  failureIcon: {
    backgroundColor: theme.colors.action.warning,
  },

  icon: {
    fontSize: 30,
    fontWeight: 'bold',
    color: theme.colors.background.light,
  },

  title: {
    fontSize: theme.fonts.sizes.lg,
    fontWeight: 'bold',
    color: theme.colors.text.default,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.text.muted,
    textAlign: 'center',
    marginBottom: theme.spacings.md,
  },

  body: {
    flexDirection: 'row',
    width: '100%',
    gap: theme.spacings.sm,
  },

  column: {
    flex: 1,
    gap: theme.spacings.xs,
  },

  label: {
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.text.muted,
    textAlign: 'center',
    letterSpacing: 0.5,
  },

  resultCard: {
    minHeight: 76,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacings.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background.dark,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  correctCard: {
    borderColor: theme.colors.action.success,
  },

  incorrectCard: {
    borderColor: theme.colors.action.danger,
  },

  result: {
    fontSize: theme.fonts.sizes.lg,
    fontWeight: 'bold',
    color: theme.colors.text.default,
    textAlign: 'center',
  },
}));

export default DrawingResultModalStyles;
