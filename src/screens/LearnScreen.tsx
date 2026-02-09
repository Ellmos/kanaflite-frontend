import { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Kanas, { GetKanasOptions } from '@constants/kanas';

type KanaType = 'hiragana' | 'katakana';

export default function LearnScreen() {
  const [kanaType, setKanaType] = useState<KanaType>('hiragana');

  const kanas = useMemo(() => {
    const options: GetKanasOptions = {
      withHandakuten: true,
      withDakuten: true,
      inverted: true,
    };
    return kanaType === 'hiragana' ? Kanas.getHiraganas(options) : Kanas.getKatakanas(options);
  }, [kanaType]);

  const toggleKanaType = () => {
    setKanaType((prev) => (prev === 'hiragana' ? 'katakana' : 'hiragana'));
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Kanas.alphabetOrder}
        contentContainerStyle={styles.list}
        renderItem={({ item: row }) => (
          <View style={styles.row}>
            {row.map((romaji: string, index) => {
              if (!romaji) {
                return <View key={index} style={styles.cell} />;
              }

              return (
                <View key={index} style={styles.cell}>
                  <Text style={styles.kana}>{kanas.get(romaji) ?? '?'}</Text>
                  <Text style={styles.romaji}>{romaji}</Text>
                </View>
              );
            })}
          </View>
        )}
      />

      <TouchableOpacity style={styles.switchButton} onPress={toggleKanaType}>
        <Text style={styles.switchText}>
          {kanaType === 'hiragana' ? 'Switch to Katakana' : 'Switch to Hiragana'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },

  list: {
    paddingBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
  },
  kana: {
    fontSize: 28,
    fontWeight: '600',
  },
  romaji: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },

  switchButton: {
    padding: 12,
    backgroundColor: '#222',
    borderRadius: 8,
    alignItems: 'center',
  },
  switchText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
