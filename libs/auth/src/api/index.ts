import { UserLoginData, UserReturnData } from './types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '@piom/constants';
import { authActions } from '../store';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<UserReturnData, UserLoginData>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(authActions.login(data));
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
