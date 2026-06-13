import { Palette } from '@constants/colors';
import { useThemeColors } from '@hooks/useThemeColor';
import { PracticeStackScreenProps } from '@navigation/Types';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SelectModeButton from './SelectModeButton';

export default function PracticeScreen({ navigation }: PracticeStackScreenProps<'Practice'>) {
  const colors = useThemeColors();
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Select a training</Text>
        <Text style={styles.subtitle}>Practice 1 character</Text>
      </View>

      <SelectModeButton
        title="Drawing"
        subtitle="Improve your writing skills"
        iconName="pen-tool"
        iconColor={'royalblue'}
        onPress={() => navigation.navigate('Draw')}
      />
      <SelectModeButton
        title="Multiple Choice"
        subtitle="Guess the correct answer"
        iconName="check-circle"
        iconColor={'purple'}
        onPress={() => navigation.navigate('MCQ')}
      />
      <SelectModeButton
        title="Timed Challenge"
        subtitle="Race against the clock"
        iconName="clock"
        iconColor={'orange'}
        onPress={() => navigation.navigate('TimeChallenge')}
      />
    </SafeAreaView>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
      backgroundColor: colors.bg,
    },

    headerContainer: {
      justifyContent: 'flex-start',
      marginBottom: 32,
    },
    title: {
      color: colors.text,
      fontSize: 24,
      fontWeight: 'bold',
    },
    subtitle: {
      color: colors.textMuted,
      fontSize: 18,
      fontWeight: '500',
    },

    buttonContainer: {
      backgroundColor: colors.bgLight,
      padding: 16,
      borderRadius: 8,
      marginBottom: 16,
    },
    buttonTitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: 'bold',
    },
    buttonSubtitle: {
      color: colors.textMuted,
      fontSize: 14,
    },
    buttonIcon: {
      marginRight: 12,
      backgroundColor: colors.bg,
      padding: 10,
      borderRadius: 10,
    },
  });
