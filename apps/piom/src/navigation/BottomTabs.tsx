import { Home } from './StudentNavigator/Home';
import { Icon } from 'native-base';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { selectAuthToken } from '@piom/auth';
import { useAppSelector } from '../store';

const Tab = createBottomTabNavigator();

export function BottomTabs() {
  const isLoggedIn = useAppSelector(selectAuthToken);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
