import { Box, Divider, Spinner } from 'native-base';
import { FlatList, RefreshControl } from 'react-native';
import {
  TopicFormRequest,
  useAcceptTopicMutation,
  useGetTopicsQuery,
} from '../../api';
import { selectIsTeacher, selectUserId } from '@piom/auth';

import React from 'react';
import { TopicElement } from '@piom/ui-components';
import { useAppSelector } from '../../store/store';

export function Home() {
  const userId = useAppSelector(selectUserId);
  const isTeacher = useAppSelector(selectIsTeacher);
  const {
    data,
    isLoading: isLoadingList,
    refetch,
    isFetching,
  } = useGetTopicsQuery(undefined);
  const topics = data?.map((el) => ({
    ...el,
    isSelected: isTeacher ? el.teacher_id === userId : el.student_id === userId,
  }));

  const [acceptTopic, { isLoading }] = useAcceptTopicMutation();

  const onPressCheckMark = (topic: TopicFormRequest) => {
    acceptTopic(topic);
  };

  if (isLoadingList) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Spinner size="lg" />
      </Box>
    );
  }

  return (
    <Box px="4" pt="2">
      <FlatList
        data={topics}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
        renderItem={({ item }) => (
          <TopicElement
            {...item}
            isLoading={isLoading}
            onPressCheckMark={() =>
              onPressCheckMark({
                ...item,
                [isTeacher ? 'teacher_id' : 'student_id']: userId,
              } as unknown as TopicFormRequest)
            }
          />
        )}
        ItemSeparatorComponent={() => <Divider />}
        keyExtractor={(item) => item.id.toString()}
      />
    </Box>
  );
}
