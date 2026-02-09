import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { useTensorflowModel } from 'react-native-fast-tflite';

import { Assets } from '@assets/Assets';

export default function HomeScreen() {
  const plugin = useTensorflowModel(Assets.V1);

  useEffect(() => {
    if (plugin.state !== 'loaded') return;

    // model.inputs: [{"dataType": "float32", "name": "serving_default_keras_tensor:0", "shape": [1, 50, 50, 1]}]
    // model.outputs: [{"dataType": "float32", "name": "StatefulPartitionedCall_1:0", "shape": [1, 72]}
  }, [plugin]);

  return (
    <View style={styles.container}>
      <Text>Home screen bitch</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
