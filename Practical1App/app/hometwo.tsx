import React from 'react';
// Importing components from React Native
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function HomeTwo() {
  return (
    // ScrollView allows content to scroll vertically if it overflows 
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.songTitle}>Intension (Justin bieber)</Text>
      <View style={styles.lyricBox}>
        <Text style={styles.lyricLine}>
          Picture-perfect, you dont need no filter
          Gorgeous, make em drop-dead, you a killer
          Shower you with all my attention
          Yeah, these are my only intentions
          
          Stay in the kitchen, cooking up, got your own bread
          Heart full of equity, you are an asset
          Make sure that you dont need no mentions
          Yeah, these are my only intentions
          
          Shoutout to your mom and dad for making you
          Standing ovation, they did a great job raising you
          When I create, you are my muse
          That kinda smile that makes the news
        </Text>
      </View>
    </ScrollView>
  );
}
// Styles for the component
const styles = StyleSheet.create({
    // Main container style
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fef9e6',
  },
   // Style for the song title
  songTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#c2185b',
  },

  // Style for the lyrics container box
  lyricBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
   // Style for the lyrics text
  lyricLine: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    color: '#2c3e50',
    fontStyle: 'italic',
  },
});