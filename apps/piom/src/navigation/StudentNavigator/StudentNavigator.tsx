import { Home } from './Home';
import { Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ProposeThemeScreen } from '../screens/ProposeThemeScreen';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export enum StudentStackScreens {
  Home = 'Home',
  ProposeTheme = 'ProposeTheme',
  Profile = 'Profile',
}

export type StudentStackParamList = {
  [StudentStackScreens.Home]: undefined;
  [StudentStackScreens.ProposeTheme]: undefined;
  [StudentStackScreens.Profile]: undefined;
};

const Tab = createBottomTabNavigator();

export function StudentNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={StudentStackScreens.Home}
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon as={Ionicons} name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={StudentStackScreens.ProposeTheme}
        component={ProposeThemeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon as={Ionicons} name="add" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={StudentStackScreens.Profile}
        component={ProposeThemeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon as={Ionicons} name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
