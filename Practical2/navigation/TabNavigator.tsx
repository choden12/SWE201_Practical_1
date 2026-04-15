import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FlowersScreen from '../screens/FlowersScreen';
import { Ionicons } from '@expo/vector-icons'; 

export type TabParamList = {
  Home: undefined;
  Flowers: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'home';
            if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'Flowers') iconName = focused ? 'flower' : 'flower-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#e6a0b3',
          tabBarInactiveTintColor: 'gray',
          headerStyle: { backgroundColor: '#fff9f0' },
          headerTitleStyle: { fontWeight: '600' },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: ' Home' }} />
        <Tab.Screen name="Flowers" component={FlowersScreen} options={{ title: 'Flower Gallery' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}