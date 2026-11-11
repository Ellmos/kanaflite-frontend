import { configureStore } from '@reduxjs/toolkit';

import modalReducer from '@modal/core/slice';

import practiceReducer from './slices/practice';

export const store = configureStore({
  reducer: {
    practice: practiceReducer,
    modal: modalReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
