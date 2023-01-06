import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '@piom/constants';
import { TopicElementProps } from '@piom/ui-components';
import { TopicForm } from '../navigation/screens/ProposeThemeScreen';

export type TopicFormRequest = TopicForm &
  ({ teacher_id: number } | { student_id: number });

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Topic'],
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
    acceptTopic: builder.mutation<void, TopicFormRequest>({
      query: (body) => ({
        url: `/topics/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Topic'],
    }),
  }),
});

export const {
  useAcceptTopicMutation,
  useGetTopicsQuery,
  useProposeTopicMutation,
} = appApi;
