import { configureStore } from '@reduxjs/toolkit';

import practiceReducer from './slices/practice';

export const store = configureStore({
  reducer: {
    practice: practiceReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
