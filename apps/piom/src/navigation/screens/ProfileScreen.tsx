import { Button, Center, Text } from 'native-base';

import React from 'react';
import { authActions } from '@piom/auth';
import { useAppDispatch } from '../../store';

export function ProfileScreen() {
  const dispatch = useAppDispatch();
  const logout = () => dispatch(authActions.logout());
  return (
    <Center>
      <Text>ProfileScreen</Text>
      <Button onPress={logout}>Logout</Button>
    </Center>
  );
}
