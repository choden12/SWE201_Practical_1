import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { ThemeProvider } from './src/context/ThemeContext';
import { HomeScreen } from './src/screens/HomeScreen';

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <HomeScreen />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});