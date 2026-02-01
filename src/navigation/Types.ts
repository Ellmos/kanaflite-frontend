import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// ...ParamList is the list of all the screens in the navigator
// and the types of the props used by the screen
// EX: const Navigator = createStackNavigator<AuthNavigatorParamList>();
//
// ...ScreenProps is a short-hand to annotate quickly the props when declaring a screen
// EX: export default function WelcomeScreen({ route, navigation }: AuthNavigatorScreenProps<'Welcome'>)

// ------- Bottom Tab stack -------
export type BottomTabStackParamList = {
  Home: undefined;
  Account: undefined;
};

export type BottomTabStackScreenProps<T extends keyof BottomTabStackParamList> =
  BottomTabScreenProps<BottomTabStackParamList, T>;
