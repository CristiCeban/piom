import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { UserReturnData } from '../api/types';

export interface AuthState {
  authToken?: string;
  email?: string;
  id?: number;
  role?: 'teacher' | 'student';
}

const initialState: AuthState = {
  authToken: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserReturnData>) => {
      state.authToken = action.payload.accessToken;
      state.email = action.payload.user.email;
      state.id = action.payload.user.id;
      state.role = action.payload.user.role;
    },
    logout: (state) => {
      state.authToken = undefined;
      state.email = undefined;
      state.id = undefined;
      state.role = undefined;
    },
  },
});

export const { actions: authActions, reducer: authReducer } = authSlice;

// TODO: to not create circular dependency, maybe to add some
// module augmentation in the future to hack this
interface RootState {
  auth: AuthState;
}
export const selectAuthToken = (state: RootState) => state.auth.authToken;

export const selectIsLoggedIn = (state: RootState) => !!state.auth.authToken;

export const selectIsTeacher = (state: RootState) =>
  state.auth.role === 'teacher';

export const selectIsStudent = (state: RootState) =>
  state.auth.role === 'student';

export const selectUserId = (state: RootState) => state.auth.id;

export const selectAuthUser = (state: RootState) => ({
  id: state.auth.id,
  email: state.auth.email,
  role: state.auth.role,
});
