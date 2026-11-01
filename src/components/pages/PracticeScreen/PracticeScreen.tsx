import { Text, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import ButtonWithIcon from '@components/base/ButtonWithIcon';
import { PracticeStackScreenProps } from '@navigation/types';

import PracticeScreenStyles from './PracticeScreen.css';

export default function PracticeScreen({ navigation }: PracticeStackScreenProps<'Practice'>) {
  return (
    <SafeAreaView style={PracticeScreenStyles.container}>
      <View style={PracticeScreenStyles.headerContainer}>
        <Text style={PracticeScreenStyles.title}>Select a training</Text>
        <Text style={PracticeScreenStyles.subtitle}>Practice 1 character</Text>
      </View>

      <ButtonWithIcon
        title='Drawing'
        subtitle='Practice your writing skills'
        iconName='pen-tool'
        iconColor={'royalblue'}
        onPress={() => navigation.navigate('Draw')}
      />
      <ButtonWithIcon
        title='Multiple Choice'
        subtitle='Find the correct answer'
        iconName='check-circle'
        iconColor={'purple'}
        onPress={() => navigation.navigate('MCQ')}
      />
      <ButtonWithIcon
        title='Timed Challenge'
        subtitle='Beat the clock'
        iconName='clock'
        iconColor={'orange'}
        onPress={() => navigation.navigate('TimeChallenge')}
      />
    </SafeAreaView>
  );
}
