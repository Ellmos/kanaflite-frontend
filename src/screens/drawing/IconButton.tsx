import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesomeName } from '@definitions/Icons';

type Props = {
  icon: FontAwesomeName;
  onPress: () => void;
  selected?: boolean;
  disabled?: boolean;
};

export default function IconButton({ icon, onPress, selected: selected = false, disabled = false }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, selected && styles.selected, disabled && styles.disabled]}>
      <FontAwesome name={icon} size={22} color={selected ? '#FFF' : '#000'} />
    </TouchableOpacity>
  );
}

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
