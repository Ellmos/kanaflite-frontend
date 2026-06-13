import React from 'react';

import { BottomTabStackScreenProps, PracticeStackParamList } from '@navigation/Types';
import { createStackNavigator } from '@react-navigation/stack';
import MCQScreen from '@screens/MCQ';
import DrawingScreen from '@screens/drawing/DrawingScreen';
import PracticeScreen from '@screens/practice/PracticeScreen';
import TimeChallengeScreen from '@screens/TimeChallenge';

const Stack = createStackNavigator<PracticeStackParamList>();

export default function PracticeStack(_: BottomTabStackScreenProps<'PracticeStack'>) {
  return (
    <Stack.Navigator initialRouteName="Draw" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Practice" component={PracticeScreen} />
      <Stack.Screen name="Draw" component={DrawingScreen} />
      <Stack.Screen name="MCQ" component={MCQScreen} />
      <Stack.Screen name="TimeChallenge" component={TimeChallengeScreen} />
    </Stack.Navigator>
  );
}
