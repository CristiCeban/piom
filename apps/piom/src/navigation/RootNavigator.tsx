import {
  AuthNavigator,
  AuthStackParamList,
  selectIsLoggedIn,
} from '@piom/auth';

import { BottomTabs } from './BottomTabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from '../store/store';

export enum RootStacks {
  Root = 'Root',
  Auth = 'Auth',
  Modal = 'Modal',
  BottomTab = 'BottomTab',
}

export type RootStackParamList = {
  [RootStacks.Root]: undefined;
  [RootStacks.Auth]: NavigatorScreenParams<AuthStackParamList>;
  [RootStacks.Modal]: undefined;
  [RootStacks.BottomTab]: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!isLoggedIn ? (
        <RootStack.Screen name={RootStacks.Auth} component={AuthNavigator} />
      ) : (
        <RootStack.Screen name={RootStacks.BottomTab} component={BottomTabs} />
      )}
    </RootStack.Navigator>
  );
}
