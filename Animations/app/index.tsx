import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FadeInBox from '../src/screens/FadeInBox';
import SlideInCard from '../src/screens/SlideInCard';
import StaggeredList from '../src/screens/StaggeredList';
import MyComponent from '../src/screens/MyComponent';
import HeartButton from '@/src/screens/HeartButton';
import AnimatedTodoList from '@/src/screens/AnimatedTodoList';

export default function Index() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <FadeInBox />
        <SlideInCard />
        <StaggeredList />
        <MyComponent />
        <HeartButton/>
        <AnimatedTodoList/>
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