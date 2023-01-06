import { Center, Text } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';

import React from 'react';

export function TopicScreen() {
  // TODO: i'm too lazy  to add proper ts types for now
  // I will refactor this later
  const route = useRoute<any>();
  const { topicId } = route.params;
  return (
    <Center>
      <Text>{topicId}</Text>
    </Center>
  );
}
