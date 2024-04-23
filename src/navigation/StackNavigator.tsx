import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import BookScreen from '../screens/Book/BookScreen.tsx';
import PlayerScreen from '../screens/Player/PlayerScreen.tsx';
import TabNavigator from './TabNavigator.tsx';
import {NavigationContainer, RouteProp, Theme} from '@react-navigation/native';
import {useTheme} from '../contexts/ThemeContext.tsx';

export type RootStackParamList = {
  TabNavigator: undefined;
  BookDetails: {bookId: number};
  Player: {bookId: number};
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

  const NavigationTheme: Theme = {
    dark: isDark,
    colors: {
      primary: theme.primary,
      background: theme.background,
      card: theme.background,
      text: theme.text,
      border: theme.background,
      notification: theme.primary,
    },
  };

  return (
    <NavigationContainer theme={NavigationTheme}>
      <Stack.Navigator id="RootStackNav">
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{headerShown: false, title: 'Catalog'}}
        />
        <Stack.Screen name={'BookDetails'} component={BookScreen} />
        <Stack.Screen name={'Player'} component={PlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
