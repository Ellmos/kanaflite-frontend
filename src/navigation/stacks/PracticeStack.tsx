import { createStackNavigator } from '@react-navigation/stack';

import DrawingScreen from '@components/pages/DrawingScreen';
import MCQScreen from '@components/pages/MCQScreen';
import PracticeScreen from '@components/pages/PracticeScreen';
import TimeChallengeScreen from '@components/pages/TimeChallengeScreen';

import type { BottomTabStackScreenProps, PracticeStackParamList } from '../types';

const Stack = createStackNavigator<PracticeStackParamList>();

export default function PracticeStack(_: BottomTabStackScreenProps<'PracticeStack'>) {
  return (
    <Stack.Navigator initialRouteName='Practice' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Practice' component={PracticeScreen} />
      <Stack.Screen name='Draw' component={DrawingScreen} />
      <Stack.Screen name='MCQ' component={MCQScreen} />
      <Stack.Screen name='TimeChallenge' component={TimeChallengeScreen} />
    </Stack.Navigator>
  );
}
