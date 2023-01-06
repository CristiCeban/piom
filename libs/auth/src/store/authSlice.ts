import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@piom/app';
export interface AuthState {
  authToken?: string;
  username?: string;
}

const initialState: AuthState = {
  authToken: undefined,
  username: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.authToken = action.payload.authToken;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.authToken = undefined;
      state.username = undefined;
    },
  },
});

const { actions, reducer } = authSlice;

export const selectAuthToken = (state: RootState) => state.auth.authToken;
