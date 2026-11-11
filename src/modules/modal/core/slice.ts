import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { ModalNotification } from '@modal/type';
import { RootState } from '@store/store';

type ModalState = {
  visible: boolean;
  notification?: ModalNotification;
};

const initialState: ModalState = {
  visible: false,
  notification: undefined,
};

const practiceSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModalRequested: (state, action: PayloadAction<ModalNotification>) => {
      state.visible = true;
      state.notification = action.payload;
    },
    closeModalRequested: (state) => {
      state.visible = false;
    },
  },
});

const modalStateSelector = (state: RootState) => state.modal;
export const selectModalVisible = (state: RootState) => modalStateSelector(state).visible;
export const selectModalNotification = (state: RootState) => modalStateSelector(state).notification;

export const { openModalRequested, closeModalRequested } = practiceSlice.actions;
export default practiceSlice.reducer;
