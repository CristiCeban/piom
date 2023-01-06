import { Box, Center, Heading, Text } from 'native-base';

import React from 'react';
import { TopicElementProps } from './TopicElement';

interface TopicOverviewProps {
  topic?: TopicElementProps;
}

export function TopicOverview({ topic }: TopicOverviewProps) {
  if (!topic) {
    return null;
  }
  const { name, description, deadline, id, student_id, teacher_id } = topic;
  return (
    <Center>
      <Box p="2" py="8" w="90%" bgColor={'blue.100'} borderRadius="2xl">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
          pb="4"
        >
          Topic overview
        </Heading>
        <Text fontSize={'lg'}>
          title:{<Text fontWeight={'bold'}>{name}</Text>}
        </Text>
        <Text fontSize={'lg'}>
          description:{<Text fontWeight={'bold'}>{description}</Text>}
        </Text>
        <Text fontSize={'lg'}>
          deadline:{<Text fontWeight={'bold'}>{deadline}</Text>}
        </Text>
      </Box>
    </Center>
  );
}
