import React, {useCallback} from 'react';
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen.tsx';
import ProfileScreen from '../screens/Profile/ProfileScreen.tsx';
import Icon from 'react-native-vector-icons/Ionicons';
import CatalogScreen from '../screens/Catalog/CatalogScreen.tsx';
import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from './StackNavigator.tsx';

const Tab = createBottomTabNavigator<TabParamList>();

type TabIconProps = {focused: boolean; color: string; size: number};

type TabParamList = {
  Home: undefined;
  Catalog: undefined;
  Profile: undefined;
};

export type ScreenProps<RouteName extends keyof TabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, RouteName>,
    StackScreenProps<RootStackParamList, 'TabNavigator', 'RootStackNav'>
  >;

const TabNavigator = () => {
  const HomeIcon = useCallback(({color, size}: TabIconProps) => {
    return <Icon name="home-outline" color={color} size={size} />;
  }, []);

  const CatalogIcon = useCallback(({color, size}: TabIconProps) => {
    return <Icon name="headset-outline" color={color} size={size} />;
  }, []);

  const ProfileIcon = useCallback(({color, size}: TabIconProps) => {
    return <Icon name="person-outline" color={color} size={size} />;
  }, []);

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="Catalog"
        component={CatalogScreen}
        options={{
          tabBarLabel: 'Catalog',
          tabBarIcon: CatalogIcon,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
