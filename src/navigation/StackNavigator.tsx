import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BookScreen from '../screens/Book/BookScreen.tsx';
import PlayerScreen from '../screens/Player/PlayerScreen.tsx';
import TabNavigator from './TabNavigator.tsx';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from 'react-native-screens/native-stack';

export type RootStackParamList = {
  TabNavigator: undefined;
  BookDetails: {bookId: number};
  Player: {bookId: number};
};

export type ScreenProps<RouteName extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, RouteName>;
};

const StackNavigator = () => {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
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
