import { Home } from './Home';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

export enum TeacherStackScreens {
  Home = 'Home',
}

export type TeacherStackParamList = {
  [TeacherStackScreens.Home]: undefined;
};

const Stack = createStackNavigator<TeacherStackParamList>();

export function TeacherNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={TeacherStackScreens.Home} component={Home} />
    </Stack.Navigator>
  );
}
