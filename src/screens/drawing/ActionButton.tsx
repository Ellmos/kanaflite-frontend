import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import { FontAwesomeName } from '@definitions/Icons';

type Props = {
  icon: FontAwesomeName;
  onPress: () => void;
  disabled?: boolean;
};

export default function ActionButton({ icon, onPress, disabled }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled && styles.disabled]}>
      <FontAwesome name={icon} size={20} color="#FFF" />
    </TouchableOpacity>
  );
}

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
