import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  Input,
  Link,
  Text,
  VStack,
} from 'native-base';
import { Controller, useForm } from 'react-hook-form';

import React from 'react';
import { UserLoginData } from '../api/types';
import { useLoginMutation } from '../api';
import { useNavigation } from '@react-navigation/native';

export function LoginScreen() {
  const [login, { isLoading }] = useLoginMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginData>();

  const navigation = useNavigation();

  const onSubmit = async (data: UserLoginData) => {
    const a = await login(data);
    console.log(a);
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: 'warmGray.200',
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl isRequired isInvalid={'email' in errors}>
            <FormControl.Label>Email ID</FormControl.Label>
            <Controller
              control={control}
              rules={{
                required: { value: true, message: 'Email is required' },
                validate: (value) => {
                  // regex for email
                  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                  return emailRegex.test(value) || 'Invalid email address';
                },
              }}
              name="email"
              render={({
                field: { onChange, onBlur, value },
                formState: {
                  errors: { email: emailError },
                },
              }) => (
                <>
                  <Input
                    autoCapitalize="none"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  {emailError && (
                    <FormControl.ErrorMessage>
                      {emailError.message}
                    </FormControl.ErrorMessage>
                  )}
                </>
              )}
            />
          </FormControl>

          <FormControl isRequired isInvalid={'password' in errors}>
            <FormControl.Label>Password</FormControl.Label>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name="password"
              render={({
                field: { onChange, onBlur, value },
                formState: {
                  errors: { password: passwordError },
                },
              }) => (
                <>
                  <Input
                    autoCapitalize="none"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    type="password"
                  />
                  {passwordError && (
                    <FormControl.ErrorMessage>
                      {passwordError.message}
                    </FormControl.ErrorMessage>
                  )}
                </>
              )}
            />
            <Link
              _text={{
                fontSize: 'xs',
                fontWeight: '500',
                color: 'indigo.500',
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Forget Password?
            </Link>
          </FormControl>
          <Button
            mt="2"
            colorScheme="indigo"
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
            >
              I'm a new user.{' '}
            </Text>
            <Link
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              // @ts-expect-error
              onPress={() => navigation.navigate('SignUp')}
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}
