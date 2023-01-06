import { Box, Button, Center, Heading, Text } from 'native-base';
import { authActions, selectAuthUser } from '@piom/auth';

import React from 'react';
import { useAppDispatch } from '../../store';
import { useAppSelector } from '../../store/store';

export function ProfileScreen() {
  const { id, email, role } = useAppSelector(selectAuthUser);
  const dispatch = useAppDispatch();
  const logout = () => dispatch(authActions.logout());

  return (
    <Center w="100%" flex="1">
      <Box p="2" py="8" w="90%" flex="1">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
          pb="4"
        >
          Welcome
        </Heading>
        <Heading
          size="lg"
          fontWeight="400"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
          pb="4"
        >
          Your current information:
        </Heading>
        <Text fontSize={'xl'}>id:{<Text fontWeight={'bold'}>{id}</Text>}</Text>
        <Text fontSize={'xl'}>
          email:{<Text fontWeight={'bold'}>{email}</Text>}
        </Text>
        <Text fontSize={'xl'}>
          role:{<Text fontWeight={'bold'}>{role}</Text>}
        </Text>
      </Box>
      <Box p="6">
        <Button onPress={logout}>Logout</Button>
      </Box>
    </Center>
  );
}
