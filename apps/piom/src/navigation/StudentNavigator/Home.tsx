import { Center, Text } from 'native-base';

import React from 'react';
import { useGetTopicsQuery } from '../../api';

export function Home() {
  const { data, isLoading } = useGetTopicsQuery(undefined);
  console.log(data);
  return (
    <Center>
      <Text>Student</Text>
    </Center>
  );
}
