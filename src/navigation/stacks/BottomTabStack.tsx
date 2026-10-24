import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { withUnistyles } from 'react-native-unistyles';

import Icon from '@components/base/Icon';
import HomeScreen from '@components/pages/HomeScreen';
import LearnScreen from '@components/pages/LearnScreen';
import { IconName } from '@type/icons';

import { BottomTabStackParamList } from '../types';
import PracticeStack from './PracticeStack';

function tabBarOptions(tabBarLabel: string, icon: IconName, iconFocused: IconName): BottomTabNavigationOptions {
  return {
    tabBarLabel,
    tabBarIcon: ({ focused, color, size }) => {
      const iconName = focused ? iconFocused : icon;
      return <Icon name={iconName} size={size} color={color} />;
    },
  };
}

const Stack = createBottomTabNavigator<BottomTabStackParamList>();
const UniNavigator = withUnistyles(Stack.Navigator);

const BottomTabStack = () => {
  return (
    <UniNavigator
      uniProps={(theme) => ({
        initialRouteName: 'PracticeStack',
        screenOptions: {
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.background.default,
            paddingHorizontal: theme.spacings.xs,
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.secondary,
          animation: 'none',
        },
      })}
    >
      <Stack.Screen name={'Home'} component={HomeScreen} options={tabBarOptions('Home', 'home-outline', 'home')} />
      <Stack.Screen
        name={'PracticeStack'}
        component={PracticeStack}
        options={tabBarOptions('Practice', 'brush-outline', 'brush')}
      />
      <Stack.Screen name={'Learn'} component={LearnScreen} options={tabBarOptions('Learn', 'book-outline', 'book')} />
    </UniNavigator>
  );
};

export default BottomTabStack;
