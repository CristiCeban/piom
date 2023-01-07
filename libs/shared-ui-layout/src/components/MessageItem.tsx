import { Box, Pressable, Text } from 'native-base';
import React, { useState } from 'react';

import { momentParseDateCalendar } from '../utils/utils';

export interface MessageItemProps {
  id: number;
  sender_id: number;
  topic_id: number;
  message: string;
  created_date: string;
  isUser: boolean;
}

export function MessageItem({
  id,
  sender_id,
  topic_id,
  message,
  created_date,
  isUser,
}: MessageItemProps) {
  // BAD TO HAVE STATE INSIDE A COMPONENT which is in list
  // but this is for university project so I will leave it as it is
  // TODO: maybe refactor this in the future (akka never)
  const [isDisplayingTime, setDisplayingTime] = useState(false);

  const onPressDisplay = () => setDisplayingTime((prev) => !prev);

  return (
    <Box flex="1">
      {isDisplayingTime ? (
        <Box alignSelf={'center'}>
          <Text>{momentParseDateCalendar(created_date)}</Text>
        </Box>
      ) : null}
      {!isUser ? (
        <Pressable
          alignContent="center"
          alignItems="center"
          alignSelf="flex-start"
          onPress={onPressDisplay}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              padding="2"
              m="2"
              borderRadius={'xl'}
              bgColor={isDisplayingTime ? 'primary.400' : 'primary.500'}
            >
              <Text>{message}</Text>
            </Box>
            <Box w="10px" />
          </Box>
        </Pressable>
      ) : (
        <Pressable
          alignContent="center"
          alignItems="center"
          alignSelf="flex-end"
          onPress={onPressDisplay}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <Box w="30px" />
            <Box
              padding="2"
              m="2"
              borderRadius={'xl'}
              bgColor={isDisplayingTime ? 'primary.200' : 'primary.300'}
            >
              <Text>{message}</Text>
            </Box>
          </Box>
        </Pressable>
      )}
    </Box>
  );
}
