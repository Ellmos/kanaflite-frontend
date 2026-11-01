import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import Kanas from '@constants/kanas';
import { RootState } from '@store/store';

type PracticeState = {
  selection: string[];
};

const initialState: PracticeState = {
  selection: Array.from(Kanas.getHiraganas({ withDakuten: false, withHandakuten: false }).keys()),
};

const practiceSlice = createSlice({
  name: 'practice',
  initialState,
  reducers: {
    selectionUpdated: (state, action: PayloadAction<string[]>) => {
      state.selection = action.payload;
    },
  },
});

const practiceStateSelector = (state: RootState) => state.practice;
export const practiceSelectionSelector = (state: RootState) => practiceStateSelector(state).selection;

export const { selectionUpdated } = practiceSlice.actions;
export default practiceSlice.reducer;
