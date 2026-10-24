import { StyleSheet } from 'react-native-unistyles';

const PracticeScreenStyles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: theme.colors.background.default,
  },

  headerContainer: {
    justifyContent: 'flex-start',
    marginBottom: 32,
  },
  title: {
    color: theme.colors.text.default,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: theme.colors.text.muted,
    fontSize: 18,
    fontWeight: '500',
  },

  buttonContainer: {
    backgroundColor: theme.colors.background.light,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonTitle: {
    color: theme.colors.text.default,
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonSubtitle: {
    color: theme.colors.text.muted,
    fontSize: 14,
  },
  buttonIcon: {
    marginRight: 12,
    backgroundColor: theme.colors.background.default,
    padding: 10,
    borderRadius: 10,
  },
}));

export default PracticeScreenStyles;
