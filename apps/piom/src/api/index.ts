import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '@piom/constants';
import { TopicForm } from '../navigation/screens/ProposeThemeScreen';

export type TopicFormRequest = TopicForm &
  ({ teacher_id: number } | { student_id: number });

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    proposeTopic: builder.mutation<void, TopicFormRequest>({
      query: (body) => ({
        url: '/topics',
        method: 'POST',
        body,
      }),
    }),
    getTopics: builder.query({
      query: () => '/topics',
    }),
  }),
});

export const { useGetTopicsQuery, useProposeTopicMutation } = appApi;
