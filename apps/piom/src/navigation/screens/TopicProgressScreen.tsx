import { Box, Divider, FlatList, Heading, Spinner } from 'native-base';
import { selectIsTeacher, selectUserId } from '@piom/auth';

import React from 'react';
import { RefreshControl } from 'react-native';
import { TopicElement } from '@piom/ui-components';
import { TopicStackScreens } from '../TopicStack';
import { useAppSelector } from '../../store';
import { useGetTopicsQuery } from '../../api';
import { useNavigation } from '@react-navigation/native';

export function TopicProgressScreen() {
  // TODO: i'm too lazy  to add proper ts types for now
  // I will refactor this later
  const navigation = useNavigation<any>();
  const userId = useAppSelector(selectUserId);
  const isTeacher = useAppSelector(selectIsTeacher);

  const {
    data,
    isLoading: isLoadingList,
    refetch,
    isFetching,
  } = useGetTopicsQuery(undefined);
  const topics = data
    ?.map((el) => ({
      ...el,
      isSelected: isTeacher
        ? el.teacher_id === userId
        : el.student_id === userId,
    }))
    .filter((el) => el[isTeacher ? 'teacher_id' : 'student_id'] === userId);

  const onPress = (topicId: number) => {
    navigation.navigate(TopicStackScreens.Topic, { topicId });
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
      <Heading pb="2">My Topics Progress</Heading>
      <FlatList
        data={topics}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
        renderItem={({ item }) => (
          <TopicElement {...item} onPress={() => onPress(item.id)} />
        )}
        ItemSeparatorComponent={() => <Divider />}
        keyExtractor={(item) => item.id.toString()}
      />
    </Box>
  );
}
