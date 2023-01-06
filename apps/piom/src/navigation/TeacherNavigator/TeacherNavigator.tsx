import { TopicStack, TopicStackScreens } from '../TopicStack';

import { Home } from '../screens/Home';
import { Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ProfileScreen } from '../screens/ProfileScreen';
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
  [TopicStackScreens.TopicNavigator]: undefined;
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
          title: 'Propose Topic',
          tabBarIcon: ({ color, size }) => (
            <Icon as={Ionicons} name="add" color={color} size={size} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name={TopicStackScreens.TopicNavigator}
        component={TopicStack}
        options={{
          headerShown: false,
          title: 'my topics',
          tabBarIcon: ({ color, size }) => (
            <Icon
              as={Ionicons}
              name="desktop-sharp"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name={TeacherStackScreens.Profile}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon as={Ionicons} name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
