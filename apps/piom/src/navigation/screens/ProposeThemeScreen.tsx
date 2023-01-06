import { Button, Center, Text } from 'native-base';

import React from 'react';
import { authActions } from '@piom/auth';
import { useAppDispatch } from '../../store';

export function ProposeThemeScreen() {
  const dispatch = useAppDispatch();
  const logout = () => dispatch(authActions.logout());
  return (
    <Center>
      <Text>ProposeThemeScreen</Text>
      <Button onPress={logout}>Logout</Button>
    </Center>
  );
}
