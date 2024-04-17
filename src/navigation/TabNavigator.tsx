import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CatalogStackNavigator from './CatalogStackNavigator';
import HomeScreen from '../screens/Home/HomeScreen.tsx';
import ProfileScreen from '../screens/Profile/ProfileScreen.tsx';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Catalog" component={CatalogStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
