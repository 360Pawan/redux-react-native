import {configureStore, Action, ThunkAction} from '@reduxjs/toolkit';

import seasonReducer from './seasonsSlice';

export const store = configureStore({
  reducer: {
    seasons: seasonReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
