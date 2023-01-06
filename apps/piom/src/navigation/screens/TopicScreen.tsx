import { Box, Center, Spinner } from 'native-base';

import React from 'react';
import { TopicOverview } from '@piom/ui-components';
import { useGetTopicQuery } from '../../api';
import { useRoute } from '@react-navigation/native';

export function TopicScreen() {
  // TODO: i'm too lazy  to add proper ts types for now
  // I will refactor this later
  const route = useRoute<any>();
  const { topicId } = route.params;
  const { data, isLoading: isLoadingTopicData } = useGetTopicQuery(topicId);
  if (isLoadingTopicData) {
    return (
      <Center flex="1">
        <Spinner size="lg" />
      </Center>
    );
  }
  return (
    <Box flex="1">
      <Box py="4">
        <TopicOverview topic={data} />
      </Box>
    </Box>
  );
}
