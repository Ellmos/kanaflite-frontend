import { StyleSheet } from 'react-native-unistyles';

const BottomPopupModalStyles = StyleSheet.create((theme) => ({
  positioner: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  container: {
    height: '98%',
    backgroundColor: theme.colors.background.default,
    paddingHorizontal: theme.spacings.lg,
    paddingBottom: theme.spacings.xl,
    paddingTop: theme.spacings.xxs,
    borderTopRightRadius: theme.borderRadius.lg,
    borderTopLeftRadius: theme.borderRadius.lg,
  },
  swipeIndicator: {
    width: '10%',
    height: theme.spacings.xxs,
    backgroundColor: theme.colors.text.default,
    borderRadius: theme.borderRadius.md,
    alignSelf: 'center',
    marginBottom: theme.spacings.md,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: theme.spacings.sm,
  },
  title: {
    color: theme.colors.text.default,
    fontSize: theme.fonts.sizes.lg,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: theme.spacings.md,
  },
  subtitle: {
    color: theme.colors.text.muted,
    fontSize: theme.fonts.sizes.md,
    marginBottom: theme.spacings.md,
    textAlign: 'center',
  },
}));

export default BottomPopupModalStyles;
