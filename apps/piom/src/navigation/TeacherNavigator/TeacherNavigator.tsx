import { Home } from '../screens/Home';
import { Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ProposeThemeScreen } from '../screens/ProposeThemeScreen';
import React from 'react';
import { TopicProgress } from '../screens/TopicProgress';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export enum TeacherStackScreens {
  Home = 'Home',
  ProposeTheme = 'ProposeTheme',
  Profile = 'Profile',
  TopicProgress = 'TopicProgress',
}

export type TeacherStackParamList = {
  [TeacherStackScreens.Home]: undefined;
  [TeacherStackScreens.ProposeTheme]: undefined;
  [TeacherStackScreens.Profile]: undefined;
  [TeacherStackScreens.TopicProgress]: undefined;
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
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name={TeacherStackScreens.TopicProgress}
        component={TopicProgress}
        options={{
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
