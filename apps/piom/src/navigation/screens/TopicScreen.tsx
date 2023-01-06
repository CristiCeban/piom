import { Center, Text } from 'native-base';

import React from 'react';
import { TopicOverview } from '@piom/ui-components';
import { useGetTopicQuery } from '../../api';
import { useRoute } from '@react-navigation/native';

export function TopicScreen() {
  // TODO: i'm too lazy  to add proper ts types for now
  // I will refactor this later
  const route = useRoute<any>();
  const { topicId } = route.params;
  const { data } = useGetTopicQuery(topicId);
  console.log(data);
  return (
    <Center>
      <TopicOverview topic={data} />
      <Text>{topicId}</Text>
    </Center>
  );
}
