import React from 'react';

// Import navigation container (wraps entire app navigation)
import { NavigationContainer } from '@react-navigation/native';

// Import bottom tab navigator
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import your screens
import HomeScreen from '../screens/HomeScreen';
import FlowersScreen from '../screens/FlowersScreen';

// Import icons
import { Ionicons } from '@expo/vector-icons'; 

// Define types for navigation routes
export type TabParamList = {
  Home: undefined;        // Home screen (no params)
  Flowers: undefined;     // Flowers screen (no params)
};

// Create tab navigator instance
const Tab = createBottomTabNavigator<TabParamList>();

// Main Tab Navigator component
export default function TabNavigator() {
  return (
    // Navigation container wraps the whole navigator
    <NavigationContainer>
      <Tab.Navigator
        // Screen options applied to all tabs
        screenOptions={({ route }) => ({
          
          // Function to set tab icons dynamically
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'home';

            // Set icon based on route name
            if (route.name === 'Home') 
              iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'Flowers') 
              iconName = focused ? 'flower' : 'flower-outline';

            // Return the icon component
            return <Ionicons name={iconName} size={size} color={color} />;
          },

          // Active tab color
          tabBarActiveTintColor: '#e6a0b3',

          // Inactive tab color
          tabBarInactiveTintColor: 'gray',

          // Header style
          headerStyle: { backgroundColor: '#fff9f0' },

          // Header text style
          headerTitleStyle: { fontWeight: '600' },
        })}
      >
        {/* Home Screen Tab */}
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: ' Home' }} 
        />

        {/* Flowers Screen Tab */}
        <Tab.Screen 
          name="Flowers" 
          component={FlowersScreen} 
          options={{ title: 'Flower Gallery' }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}