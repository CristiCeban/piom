import { Center, Text } from 'native-base';

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
      <Text>{name}</Text>
      <Text>{description}</Text>
      <Text>{deadline}</Text>
      <Text>{id}</Text>
      <Text>{student_id}</Text>
      <Text>{teacher_id}</Text>
    </Center>
  );
}
