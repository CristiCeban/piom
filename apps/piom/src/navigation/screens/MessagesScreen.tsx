import {
  Box,
  Center,
  FlatList,
  Icon,
  IconButton,
  Input,
  KeyboardAvoidingView,
  Pressable,
  Spinner,
  Text,
} from 'native-base';
import { MessageItem, MessageItemProps } from '@piom/ui-components';
import { Platform, TextInput } from 'react-native';
import React, { useRef, useState } from 'react';
import {
  useGetMessagesForTopicQuery,
  useSendMessageForTopicMutation,
} from '../../api';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { selectUserId } from '@piom/auth';
import { useAppSelector } from '../../store/store';
import { useRoute } from '@react-navigation/native';

export function MessagesScreen() {
  // TODO: i'm too lazy  to add proper ts types for now
  // I will refactor this later
  const route = useRoute<any>();
  const { topicId } = route.params;
  const { data, isLoading: isLoadingMessages } =
    useGetMessagesForTopicQuery(topicId);
  const userId = useAppSelector(selectUserId);

  const [sendMessage, { isLoading: isSendingMessage }] =
    useSendMessageForTopicMutation();

  const [inputText, setInputText] = useState('');
  const inputRef = useRef<TextInput>(null);
  // sort messages by date
  const messagesData = Array.isArray(data)
    ? [...data]?.sort(
        (a, b) =>
          new Date(b.created_date).getTime() -
          new Date(a.created_date).getTime()
      )
    : [];

  const onSendMessage = async () => {
    if (inputRef && inputText) {
      const message: Omit<MessageItemProps, 'id' | 'isUser'> = {
        sender_id: userId,
        topic_id: topicId,
        message: inputText,
        created_date: new Date().toISOString(),
      };
      sendMessage(message as MessageItemProps);
      setInputText('');
      inputRef?.current?.blur();
    }
  };

  if (isLoadingMessages) {
    return (
      <Center flex="1">
        <Spinner size="lg" />
      </Center>
    );
  }

  return (
    <KeyboardAvoidingView
      display="flex"
      flex="1"
      p="3"
      pt="2"
      bgColor={'primary.100'}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Box flex="1">
        <FlatList
          flex="1"
          data={messagesData}
          renderItem={({ item }) => (
            <MessageItem {...item} isUser={userId === item.sender_id} />
          )}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          inverted
        />
        <Box display="flex" justifyContent="flex-end" paddingTop="3">
          <Box display="flex" flexDirection="row" alignItems="center">
            <Pressable mr="1">
              <Text fontSize={'lg'}>{String.fromCodePoint(0x1f600)}</Text>
            </Pressable>
            <Box
              borderRadius="2xl"
              px="2"
              py="1"
              flex="1"
              background={'primary.900'}
            >
              <Input
                ref={inputRef}
                underlineColorAndroid={'transparent'}
                placeholder={'Your Message'}
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={onSendMessage}
                bgColor="transparent"
                borderRadius="0"
                color={'primary.100'}
              />
            </Box>
            <IconButton
              // ml="1"
              onPress={onSendMessage}
              icon={<Icon as={Ionicons} name="send" />}
            />
          </Box>
        </Box>
      </Box>
    </KeyboardAvoidingView>
  );
}
