import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BookScreen from '../screens/Book/BookScreen.tsx';
import PlayerScreen from '../screens/Player/PlayerScreen.tsx';
import TabNavigator from './TabNavigator.tsx';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList} from './types.tsx';

const StackNavigator = () => {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen name={'BookDetails'} component={BookScreen} />
        <Stack.Screen name={'Player'} component={PlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
