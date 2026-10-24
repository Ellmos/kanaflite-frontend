import { View, StyleSheet } from 'react-native';

import IconButton from './IconButton';

type ToolbarProps = {
  mode: 'draw' | 'erase';
  currStroke: number;
  maxStroke: number;
  onUndo: () => void;
  onRedo: () => void;
  onDraw: () => void;
  onErase: () => void;
};

const Toolbar = ({ mode, currStroke, maxStroke, onUndo, onRedo, onDraw, onErase }: ToolbarProps) => {
  return (
    <View style={styles.toolbar}>
      <IconButton icon='rotate-left' disabled={currStroke <= 0} onPress={onUndo} />
      <IconButton icon='rotate-right' disabled={currStroke >= maxStroke} onPress={onRedo} />

      <IconButton icon='paint-brush' selected={mode === 'draw'} onPress={onDraw} />

      <IconButton icon='eraser' selected={mode === 'erase'} onPress={onErase} />
    </View>
  );
};

export default Toolbar;

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
});
