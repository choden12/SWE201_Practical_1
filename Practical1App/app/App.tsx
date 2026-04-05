import React, { useState } from 'react';
// It will import basic React Native components
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';

// importing icons from Expo
import Ionicons from '@expo/vector-icons/Ionicons';

// importing your two screens
import HomeOne from './homeone';
import HomeTwo from './hometwo';

// main App component
export default function App() {
    // State to track which tab is active
  const [activeTab, setActiveTab] = useState('HomeOne');

  return (
    // SafeAreaView prevents UI from overlapping with notch/status bar
    <SafeAreaView style={styles.container}>
        
      {/* Screen Content */}
      <View style={styles.content}>
        {activeTab === 'HomeOne' ? <HomeOne /> : <HomeTwo />}
      </View>

      {/* Bottom Tab Bar */}
      <View style={styles.bottomBar}>
         {/* First Tab*/}
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab('HomeOne')}
          activeOpacity={0.7}
        >
          <Ionicons
          // Change icon depending on active tab
            name={activeTab === 'HomeOne' ? 'heart' : 'heart-outline'}
            size={26}
            color={activeTab === 'HomeOne' ? '#e91e63' : '#8e8e93'}
          />
          <Text style={[
            styles.tabLabel,
            activeTab === 'HomeOne' && styles.activeLabel
          ]}>
            Singer
          </Text>
        </TouchableOpacity>
        
         {/* Second Tab */}
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab('HomeTwo')}
          activeOpacity={0.7}
        >
          <Ionicons
            name={activeTab === 'HomeTwo' ? 'heart' : 'heart-outline'}
            size={26}
            color={activeTab === 'HomeTwo' ? '#e91e63' : '#8e8e93'}
          />
          <Text style={[
            styles.tabLabel,
            activeTab === 'HomeTwo' && styles.activeLabel
          ]}>
            Lyrics
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
// Styles
const styles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  // Bottom navigation bar
  bottomBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#ffffff',
    borderTopWidth: 0.5,
    borderTopColor: '#d1d1d6',
    paddingBottom: 8,
    paddingTop: 8,
  },
  // Each tab button
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Tab text
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
    color: '#8e8e93',
  },
   // Active tab text color
  activeLabel: {
    color: '#e91e63',
  },
});