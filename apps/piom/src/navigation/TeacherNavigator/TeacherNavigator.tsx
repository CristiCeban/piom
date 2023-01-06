import { Home } from './Home';
import { Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ProposeThemeScreen } from '../screens/ProposeThemeScreen';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export enum TeacherStackScreens {
  Home = 'Home',
  ProposeTheme = 'ProposeTheme',
  Profile = 'Profile',
}

export type TeacherStackParamList = {
  [TeacherStackScreens.Home]: undefined;
  [TeacherStackScreens.ProposeTheme]: undefined;
  [TeacherStackScreens.Profile]: undefined;
};

const Tab = createBottomTabNavigator();

export function TeacherNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={TeacherStackScreens.Home}
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon as={Ionicons} name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={TeacherStackScreens.ProposeTheme}
        component={ProposeThemeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon as={Ionicons} name="add" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={TeacherStackScreens.Profile}
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
