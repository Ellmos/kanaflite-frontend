import { StyleSheet, View, Text } from 'react-native';

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <Text>Account screen bitch</Text>
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
