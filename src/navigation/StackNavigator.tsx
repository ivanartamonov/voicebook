import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import BookScreen from '../screens/Book/BookScreen.tsx';
import TabNavigator from './TabNavigator.tsx';
import {NavigationContainer, RouteProp, Theme} from '@react-navigation/native';
import {useTheme} from '../contexts/ThemeContext.tsx';
import {Book} from '../types/types.ts';
import Player from '../components/Player/Player.tsx';
import SettingsScreen from '../screens/Settings/SettingsScreen.tsx';
import PersonalInfoScreen from '../screens/PersonalInfo/PersonalInfoScreen.tsx';
import SignInScreen from '../screens/SignIn/SignInScreen.tsx';
import {useAuth} from '../contexts/AuthContext.tsx';
import SignUpScreen from '../screens/SignUp/SignUpScreen.tsx';

export type RootStackParamList = {
  TabNavigator: undefined;
  BookDetails: {book: Book};
  Settings: undefined;
  PersonalInfo: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export type ScreenProps<RouteName extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<
    RootStackParamList,
    RouteName,
    'RootStackNav'
  >;
  route: RouteProp<RootStackParamList, RouteName>;
};

const StackNavigator = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  const {theme, isDark} = useTheme();
  const {isAuthenticated} = useAuth();

  const NavigationTheme: Theme = {
    dark: isDark,
    colors: {
      primary: theme.text,
      background: theme.background,
      card: theme.background,
      text: theme.text,
      border: theme.background,
      notification: theme.primary,
    },
  };

  return (
    <NavigationContainer theme={NavigationTheme}>
      <Player />
      <Stack.Navigator id="RootStackNav" screenOptions={{headerShown: false}}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen
              name={'BookDetails'}
              component={BookScreen}
              options={{title: 'Book'}}
            />
            <Stack.Screen
              name={'Settings'}
              component={SettingsScreen}
              options={{title: 'Settings'}}
            />
            <Stack.Screen
              name={'PersonalInfo'}
              component={PersonalInfoScreen}
              options={{title: 'Personal Info'}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name={'SignIn'}
              component={SignInScreen}
              options={{
                title: 'Sign In',
                animationTypeForReplace: !isAuthenticated ? 'pop' : 'push',
              }}
            />
            <Stack.Screen
              name={'SignUp'}
              component={SignUpScreen}
              options={{
                title: 'Sign Up',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
