import React from 'react';

// Import necessary React Native components
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, Image } from 'react-native';

// Main Home Screen component
export default function HomeScreen() {

  // Get device width for responsive design
  const { width } = useWindowDimensions();

  // Check if screen is small (for styling adjustment)
  const isSmall = width < 400;

  return (
    // ScrollView allows vertical scrolling
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>

        {/* Title text */}
        <Text style={[styles.title, isSmall && styles.titleSmall]}>
          Hello, friend!
        </Text>

        {/* Cute message card */}
        <View style={styles.cuteCard}>
          <Text style={styles.emoji}>🐣</Text>

          {/* Message text */}
          <Text style={styles.message}>
            Let's explore the flowers. Stay curious and kind.
          </Text>
        </View>

        {/* Stats section (row layout) */}
        <View style={styles.statsRow}>

          {/* First stat box */}
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>🌼</Text>
            <Text> Three flower types</Text>
          </View>

          {/* Second stat box */}
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>🌸</Text>
            <Text>flowers bloomed</Text>
          </View>

        </View>
      </View>
    </ScrollView>
  );
}

// Styles for the component
const styles = StyleSheet.create({

  // Ensures ScrollView content takes full height
  scrollContainer: { flexGrow: 1 },

  // Main container styling
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff9f0',
  },

  // Title styling
  title: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
    color: '#e6a0b3',
  },

  // Smaller title for small screens
  titleSmall: { fontSize: 24 },

  // Card styling for message box
  cuteCard: {
    backgroundColor: '#ffe8e0',
    borderRadius: 30,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },

  // Emoji styling
  emoji: { fontSize: 48, marginBottom: 12 },

  // Message text styling
  message: { fontSize: 18, textAlign: 'center', color: '#b95f7a' },

  // Row layout for stats
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 16,
  },

  // Individual stat box styling
  statBox: {
    flex: 1,
    backgroundColor: '#fce4ec',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
  },

  // Stat number / emoji styling
  statNumber: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
});