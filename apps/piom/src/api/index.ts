import { MessageItemProps, TopicElementProps } from '@piom/ui-components';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '@piom/constants';
import { TopicForm } from '../navigation/screens/ProposeThemeScreen';

export type TopicFormRequest = TopicForm &
  ({ teacher_id: number } | { student_id: number });

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Topic', 'Messages'],
  endpoints: (builder) => ({
    proposeTopic: builder.mutation<void, TopicFormRequest>({
      query: (body) => ({
        url: '/topics',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Topic'],
    }),
    getTopics: builder.query<TopicElementProps[], void>({
      query: () => '/topics',
      providesTags: ['Topic'],
    }),
    getTopic: builder.query<TopicElementProps, number>({
      query: (id) => `/topics/${id}`,
      providesTags: ['Topic'],
    }),
    acceptTopic: builder.mutation<void, TopicFormRequest>({
      query: (body) => ({
        url: `/topics/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Topic'],
    }),
    getMessagesForTopic: builder.query<MessageItemProps[], number>({
      query: (id) => `/messages?topic_id=${id}`,
      providesTags: ['Messages'],
    }),
    sendMessageForTopic: builder.mutation<void, MessageItemProps>({
      query: (body) => ({
        url: '/messages',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
});

export const {
  useAcceptTopicMutation,
  useGetTopicsQuery,
  useGetTopicQuery,
  useGetMessagesForTopicQuery,
  useProposeTopicMutation,
  useSendMessageForTopicMutation,
} = appApi;
