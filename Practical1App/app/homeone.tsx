import React from 'react';
import {  Text,  StyleSheet, ScrollView } from 'react-native';

export default function HomeOne() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}># Justin bieber</Text>
      <Text style={styles.subtitle}>
        Justin Bieber is a Canadian singer-songwriter who rose to global fame as a teenager after being discovered on YouTube in 2007. 
        Rise to Stardom: Discovered by Scooter Braun and mentored by Usher, he became a teen idol with hits like Baby and Intentsion.
        Musical Evolution: Transitioned from teen pop to more mature pop/R&B with albums like Purpose (2015) and Justice (2021)
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff5f5',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#c2185b',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  singerImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#e91e63',
  },
  bulletPoints: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  bullet: {
    fontSize: 16,
    marginBottom: 12,
    color: '#555',
  },
});