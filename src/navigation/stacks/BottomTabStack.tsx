import React from 'react';

import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { useThemeColors } from '@hooks/useThemeColor';
import { BottomTabStackParamList } from '@navigation/Types';
import HomeScreen from '@screens/HomeScreen';
import LearnScreen from '@screens/LearnScreen';
import { IconName } from '@definitions/Icons';
import Icon from 'components/Icon';
import PracticeStack from './PracticeStack';

const Stack = createBottomTabNavigator<BottomTabStackParamList>();

function tabBarOptions(
  tabBarLabel: string,
  icon: IconName,
  iconFocused: IconName,
): BottomTabNavigationOptions {
  return {
    tabBarLabel,
    tabBarIcon: ({ focused, color, size }) => {
      const iconName = focused ? iconFocused : icon;
      return <Icon name={iconName} size={size} color={color} />;
    },
  };
}

export default function BottomTabStack() {
  const colors = useThemeColors();

  return (
    <Stack.Navigator
      initialRouteName="PracticeStack"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { paddingHorizontal: 8 },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
        animation: 'shift',
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={tabBarOptions('Home', 'home-outline', 'home')}
      />
      <Stack.Screen
        name="PracticeStack"
        component={PracticeStack}
        options={tabBarOptions('Practice', 'brush-outline', 'brush')}
      />
      <Stack.Screen
        name="Learn"
        component={LearnScreen}
        options={tabBarOptions('Learn', 'book-outline', 'book')}
      />
    </Stack.Navigator>
  );
}
