import { StyleSheet, TouchableOpacity } from 'react-native';

import Icon from '@components/base/Icon';
import { IconName } from '@type/icons';

type IconButtonProps = {
  icon: IconName;
  onPress: () => void;
  selected?: boolean;
  disabled?: boolean;
};

const IconButton = ({ icon, onPress, selected: selected = false, disabled = false }: IconButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, selected && styles.selected, disabled && styles.disabled]}
    >
      <Icon name={icon} size={22} color={selected ? '#FFF' : '#000'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#EAEAEA',
  },
  selected: {
    backgroundColor: '#000',
  },
  disabled: {
    opacity: 0.4,
  },
});

export default IconButton;
