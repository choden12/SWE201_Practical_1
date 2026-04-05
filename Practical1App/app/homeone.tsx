import React from 'react';
// Importing components from React Native
import { Text, Image, StyleSheet, ScrollView } from 'react-native';
// HomeOne screen component
export default function HomeOne() {
  return (
    // ScrollView allows scrolling if content is long
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}> Justin bieber</Text>
      <Image
        
      />
      <Text style={styles.intro}>
        Justin Bieber is a Canadian singer-songwriter who rose to global fame as a teenager after being discovered on YouTube in 2007. 
        Rise to Stardom: Discovered by Scooter Braun and mentored by Usher, he became a teen idol with hits like Baby and Intentsion.
        Musical Evolution: Transitioned from teen pop to more mature pop/R&B with albums like Purpose (2015) and Justice (2021)
      </Text>
    </ScrollView>
  );
}
// Styles for the component
const styles = StyleSheet.create({
 // Main container
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff5f5',
  },
   // Title styling
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#c2185b',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#e91e63',
  },
  // Image styling
  intro: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
    color: '#333',
  },
  fact: {
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: '#ffe0e0',
    padding: 10,
    borderRadius: 10,
    color: '#b0003a',
  },
});