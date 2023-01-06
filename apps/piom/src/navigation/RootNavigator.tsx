import { AuthNavigator, AuthStackParamList } from '@piom/auth';

import { NavigatorScreenParams } from '@react-navigation/native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

export enum RootStacks {
  Root = 'Root',
  Auth = 'Auth',
  Modal = 'Modal',
}

export type RootStackParamList = {
  [RootStacks.Root]: undefined;
  [RootStacks.Auth]: NavigatorScreenParams<AuthStackParamList>;
  [RootStacks.Modal]: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name={RootStacks.Auth} component={AuthNavigator} />
    </RootStack.Navigator>
  );
}
