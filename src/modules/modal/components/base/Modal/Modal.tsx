import { useCallback, type PropsWithChildren } from 'react';
import { Keyboard } from 'react-native';

import ReactNativeModal, { ModalProps as ReactNativeModalProps } from 'react-native-modal';

import {
  MODAL_ANIMATION_TIMING_MS,
  MODAL_BACKDROP_ANIMATION_TIMING_MS,
  MODAL_BACKDROP_OPACITY,
} from '@modal/constants';
import { closeModalRequested, selectModalVisible } from '@modal/core/slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';

export type ModalProps = PropsWithChildren<Partial<ReactNativeModalProps>>;
const Modal = ({ children, ...props }: ModalProps) => {
  const dispatch = useAppDispatch();
  const modalVisible = useAppSelector(selectModalVisible);

  const handleClose = useCallback(
    async (waitForDismiss = true) => {
      if (Keyboard.isVisible()) {
        Keyboard.dismiss();
        if (waitForDismiss) {
          await new Promise((resolve) => setTimeout(resolve, 100)); // better feeling
        }
      }

      dispatch(closeModalRequested());
    },
    [dispatch],
  );

  return (
    <ReactNativeModal
      isVisible={modalVisible}
      onBackdropPress={() => handleClose(true)}
      onBackButtonPress={() => handleClose(true)}
      onSwipeComplete={() => handleClose(false)}
      hideModalContentWhileAnimating={true}
      animationInTiming={MODAL_ANIMATION_TIMING_MS}
      animationOutTiming={MODAL_ANIMATION_TIMING_MS}
      backdropTransitionOutTiming={MODAL_BACKDROP_ANIMATION_TIMING_MS}
      backdropTransitionInTiming={MODAL_BACKDROP_ANIMATION_TIMING_MS}
      backdropOpacity={MODAL_BACKDROP_OPACITY}
      {...props}
    >
      {children}
    </ReactNativeModal>
  );
};

export default Modal;
