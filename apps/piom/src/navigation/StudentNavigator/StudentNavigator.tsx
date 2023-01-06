import { Home } from './Home';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

export enum StudentStackScreens {
  Home = 'Home',
}

export type StudentStackParamList = {
  [StudentStackScreens.Home]: undefined;
};

const Stack = createStackNavigator<StudentStackParamList>();

export function StudentNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={StudentStackScreens.Home} component={Home} />
    </Stack.Navigator>
  );
}
