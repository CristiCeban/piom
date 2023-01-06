import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  configureStore,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { authApi, authReducer } from '@piom/auth';

import { appApi } from '../api/index';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useCallback } from 'react';

const middleware = [];

if (__DEV__ && !process.env.JEST_WORKER_ID) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const createDebugger = require('redux-flipper').default;
  middleware.push(createDebugger());
}

const reducers = {
  auth: authReducer,
  [appApi.reducerPath]: appApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
};

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(middleware)
      .concat(appApi.middleware)
      .concat(authApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useDispatchAction<T extends string = string>(
  action: ActionCreatorWithoutPayload<T>
): ReturnType<typeof useCallback>;

export function useDispatchAction<T extends string = string>(
  action: ActionCreatorWithPayload<T>
): ReturnType<typeof useCallback>;

// TODO: fix this type later
export function useDispatchAction(action: any) {
  const dispatch = useAppDispatch();
  return useCallback(() => dispatch(action()), [dispatch, action]);
}
