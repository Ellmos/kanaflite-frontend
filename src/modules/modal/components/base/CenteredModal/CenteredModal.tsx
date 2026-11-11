import { type PropsWithChildren } from 'react';
import { View } from 'react-native';

import Modal from '@modal/components/base/Modal';

import CenteredModalStyles from './CenteredModal.css';

type CenteredModalProps = PropsWithChildren;

const CenteredModal = ({ children }: CenteredModalProps) => {
  return (
    <Modal
      animationIn='fadeIn'
      animationOut='fadeOut'
      animationInTiming={200}
      animationOutTiming={100}
      backdropTransitionInTiming={200}
      backdropTransitionOutTiming={100}
      backdropOpacity={0.3}
    >
      <View style={CenteredModalStyles.positioner}>
        <View style={CenteredModalStyles.container}>{children}</View>
      </View>
    </Modal>
  );
};

export default CenteredModal;
