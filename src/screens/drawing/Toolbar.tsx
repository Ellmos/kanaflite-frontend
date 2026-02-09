import React from 'react';
import { View, StyleSheet } from 'react-native';
import IconButton from './IconButton';

type Props = {
  mode: 'draw' | 'erase';
  currStroke: number;
  maxStroke: number;
  onUndo: () => void;
  onRedo: () => void;
  onDraw: () => void;
  onErase: () => void;
};

export default function Toolbar({
  mode,
  currStroke,
  maxStroke,
  onUndo,
  onRedo,
  onDraw,
  onErase,
}: Props) {
  return (
    <View style={styles.toolbar}>
      <IconButton icon="rotate-left" disabled={currStroke <= 0 } onPress={onUndo} />
      <IconButton icon="rotate-right" disabled={currStroke >= maxStroke} onPress={onRedo} />

      <IconButton
        icon="paint-brush"
        selected={mode === 'draw'}
        onPress={onDraw}
      />

      <IconButton
        icon="eraser"
        selected={mode === 'erase'}
        onPress={onErase}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
});
