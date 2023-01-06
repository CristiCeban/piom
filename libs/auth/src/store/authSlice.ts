import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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

// TODO: to not create circular dependency, maybe to add some
// module augmentation in the future to hack this
export const selectAuthToken = (state: any) => state.auth.authToken;
