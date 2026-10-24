import { TouchableOpacity, StyleSheet } from 'react-native';

import Icon from '@components/base/Icon';
import { IconName } from '@type/icons';

type ActionButtonProps = {
  icon: IconName;
  onPress: () => void;
  disabled?: boolean;
};

const ActionButton = ({ icon, onPress, disabled }: ActionButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={[styles.button, disabled && styles.disabled]}>
      <Icon name={icon} size={20} color='#FFF' />
    </TouchableOpacity>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#000',
    borderRadius: 8,
  },
  disabled: {
    opacity: 0.4,
  },
});
