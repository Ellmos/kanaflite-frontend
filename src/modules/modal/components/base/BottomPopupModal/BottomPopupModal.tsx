import { type PropsWithChildren } from 'react';
import { Text, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Modal from '@modal/components/base/Modal';

import BottomPopupModalStyles from './BottomPopupModal.css';

type BottomPopupModalProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
}>;

const BottomPopupModal = ({ title, subtitle, children }: BottomPopupModalProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal swipeDirection={['down']} style={{ margin: 0, paddingTop: insets.top }}>
      <View style={BottomPopupModalStyles.positioner}>
        <View style={BottomPopupModalStyles.container}>
          <View style={BottomPopupModalStyles.swipeIndicator} />

          <View style={BottomPopupModalStyles.headerContainer}>
            <Text style={BottomPopupModalStyles.title}>{title}</Text>
          </View>

          {subtitle && <Text style={BottomPopupModalStyles.subtitle}>{subtitle}</Text>}

          {children}
        </View>
      </View>
    </Modal>
  );
};

export default BottomPopupModal;
