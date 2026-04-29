import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingScreen from '../src/screens/LoadingScreen';
import SuccessAnimation from '../src/screens/SuccessAnimation';
import BasicTouchHandler from '@/src/screens/BasicTouchHandler';


export default function Index() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <LoadingScreen />
        <SuccessAnimation />
        < BasicTouchHandler/>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});