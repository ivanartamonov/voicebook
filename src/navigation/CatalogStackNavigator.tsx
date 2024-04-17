import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CatalogScreen from '../screens/Catalog/CatalogScreen.tsx';
import BookScreen from '../screens/Book/BookScreen.tsx';
import PlayerScreen from '../screens/Player/PlayerScreen.tsx';

const Stack = createStackNavigator();

function CatalogStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CatalogList" component={CatalogScreen} />
      <Stack.Screen name="BookDetails" component={BookScreen} />
      <Stack.Screen name="Player" component={PlayerScreen} />
    </Stack.Navigator>
  );
}

export default CatalogStackNavigator;
