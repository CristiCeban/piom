import { Box, Button, FormControl, Heading, Input, VStack } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { TopicFormRequest, useProposeTopicMutation } from '../../api';
import { selectIsTeacher, selectUserId } from '@piom/auth';

import { Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { useAppSelector } from '../../store/store';
import { useNavigation } from '@react-navigation/native';

export interface TopicForm {
  title: string;
  description: string;
  deadline: Date;
}

export function ProposeThemeScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TopicForm>({
    defaultValues: {
      deadline: new Date(),
    },
  });

  const navigation = useNavigation();
  const [submit, { isLoading }] = useProposeTopicMutation();
  const isTeacher = useAppSelector(selectIsTeacher);
  const id = useAppSelector(selectUserId);

  const onSubmit = async (data: TopicForm) => {
    let temp = {
      ...data,
    };
    if (isTeacher) {
      temp = { ...temp, teacher_id: id } as TopicFormRequest;
    } else {
      temp = { ...temp, student_id: id } as TopicFormRequest;
    }
    const a = await submit(temp as TopicFormRequest);
    if ('error' in a) {
      Alert.alert('Error', 'Error while proposing topic', [
        {
          text: 'OK',
          style: 'cancel',
        },
        {
          text: 'Retry',
          onPress: () => onSubmit(data),
        },
      ]);
      return;
    }
    navigation.goBack();
  };

  return (
    <Box py="8" px="4">
      <Heading
        size="lg"
        fontWeight="600"
        color="coolGray.800"
        _dark={{
          color: 'warmGray.50',
        }}
        alignSelf={'center'}
      >
        Propose topic
      </Heading>

      <VStack space={3} mt="5">
        <FormControl isRequired isInvalid={'title' in errors}>
          <FormControl.Label>Title</FormControl.Label>
          <Controller
            control={control}
            rules={{
              required: { value: true, message: 'Title is required' },
            }}
            name="title"
            render={({
              field: { onChange, onBlur, value },
              formState: {
                errors: { title: titleError },
              },
            }) => (
              <>
                <Input
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {titleError && (
                  <FormControl.ErrorMessage>
                    {titleError.message}
                  </FormControl.ErrorMessage>
                )}
              </>
            )}
          />
        </FormControl>

        <FormControl isRequired isInvalid={'description' in errors}>
          <FormControl.Label>Description</FormControl.Label>
          <Controller
            control={control}
            rules={{
              required: { value: true, message: 'Description is required' },
            }}
            name="description"
            render={({
              field: { onChange, onBlur, value },
              formState: {
                errors: { description: descriptionError },
              },
            }) => (
              <>
                <Input
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {descriptionError && (
                  <FormControl.ErrorMessage>
                    {descriptionError.message}
                  </FormControl.ErrorMessage>
                )}
              </>
            )}
          />
        </FormControl>

        <FormControl isRequired isInvalid={'deadline' in errors}>
          <FormControl.Label>Deadline</FormControl.Label>
          <Controller
            control={control}
            rules={{
              required: { value: true, message: 'Deadline is required' },
            }}
            name="deadline"
            render={({
              field: { onChange, value },
              formState: {
                errors: { deadline: deadlineError },
              },
            }) => (
              <Box alignSelf="center">
                <DateTimePicker
                  testID="dateTimePicker"
                  value={value}
                  mode={'date'}
                  is24Hour={true}
                  onChange={(_, selectedDate) => {
                    onChange(selectedDate);
                  }}
                />

                {deadlineError && (
                  <FormControl.ErrorMessage>
                    {deadlineError.message}
                  </FormControl.ErrorMessage>
                )}
              </Box>
            )}
          />
        </FormControl>

        <Button
          mt="2"
          colorScheme="indigo"
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
          isDisabled={isLoading}
        >
          Submit
        </Button>
      </VStack>
    </Box>
  );
}
