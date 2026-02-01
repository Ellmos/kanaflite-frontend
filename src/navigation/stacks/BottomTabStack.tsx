import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { IoniconName } from '@definitions/Icons';
import { useThemeColors } from '@hooks/useThemeColor';
import { BottomTabStackParamList } from '@navigation/Types';
import AccountScreen from '@screens/AccountScreen';
import HomeScreen from '@screens/HomeScreen';

const Stack = createBottomTabNavigator<BottomTabStackParamList>();

function tabBarOptions(
  tabBarLabel: string,
  icon: IoniconName,
  iconFocused: IoniconName,
): BottomTabNavigationOptions {
  return {
    tabBarLabel,
    tabBarIcon: ({ focused, color, size }) => {
      const iconName = focused ? iconFocused : icon;
      return <Ionicons name={iconName} size={size} color={color} />;
    },
  };
}

export default function BottomTabStack() {
  const colors = useThemeColors();

  return (
    <Stack.Navigator
      initialRouteName="Home"
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
        name="Account"
        component={AccountScreen}
        options={tabBarOptions('Account', 'person-outline', 'person')}
      />
    </Stack.Navigator>
  );
}
