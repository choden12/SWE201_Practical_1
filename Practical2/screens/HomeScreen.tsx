import React from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, Image } from 'react-native';

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isSmall = width < 400;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={[styles.title, isSmall && styles.titleSmall]}>
          Hello, friend!
        </Text>
        <View style={styles.cuteCard}>
          <Text style={styles.emoji}>🐣</Text>
          <Text style={styles.message}>
            Let's explore the flowers. Stay curious and kind.
          </Text>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>🌼</Text>
            <Text> Three flower types</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>🌸</Text>
            <Text>flowers bloomed</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff9f0',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
    color: '#e6a0b3',
  },
  titleSmall: { fontSize: 24 },
  cuteCard: {
    backgroundColor: '#ffe8e0',
    borderRadius: 30,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  emoji: { fontSize: 48, marginBottom: 12 },
  message: { fontSize: 18, textAlign: 'center', color: '#b95f7a' },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#fce4ec',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
});