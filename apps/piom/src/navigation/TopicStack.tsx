import { MessagesScreen } from './screens/MessagesScreen';
import React from 'react';
import { TopicProgressScreen } from './screens/TopicProgressScreen';
import { TopicScreen } from './screens/TopicScreen';
import { createStackNavigator } from '@react-navigation/stack';

export enum TopicStackScreens {
  TopicNavigator = 'TopicNavigator',
  TopicProgress = 'TopicProgress',
  Topic = 'Topic',
  Messages = 'Messages',
}

export type StudentStackParamList = {
  [TopicStackScreens.TopicNavigator]: undefined;
  [TopicStackScreens.TopicProgress]: undefined;
  [TopicStackScreens.Topic]: { topicId: string };
  [TopicStackScreens.Messages]: { topicId: string };
};

const Stack = createStackNavigator<StudentStackParamList>();

export function TopicStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: 'Topic Progress',
        }}
        name={TopicStackScreens.TopicProgress}
        component={TopicProgressScreen}
      />
      <Stack.Screen name={TopicStackScreens.Topic} component={TopicScreen} />
      <Stack.Screen
        name={TopicStackScreens.Messages}
        component={MessagesScreen}
      />
    </Stack.Navigator>
  );
}
