import { Box, Button, Center, Spinner } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';

import React from 'react';
import { TopicOverview } from '@piom/ui-components';
import { TopicStackScreens } from '../TopicStack';
import { useGetTopicQuery } from '../../api';

export function TopicScreen() {
  // TODO: i'm too lazy  to add proper ts types for now
  // I will refactor this later
  const route = useRoute<any>();
  const { topicId } = route.params;
  const navigation = useNavigation<any>();
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
      <Box py="4" flex="1">
        <TopicOverview topic={data} />
      </Box>
      <Box alignItems={'center'} mb="4">
        <Button
          w="16"
          onPress={() =>
            navigation.navigate(TopicStackScreens.Messages, { topicId })
          }
        >
          Chat
        </Button>
      </Box>
    </Box>
  );
}
