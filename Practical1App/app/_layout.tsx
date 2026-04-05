import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = focused ? 'heart' : 'heart-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#e91e63',
        tabBarInactiveTintColor: '#8e8e93',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 0.5,
          borderTopColor: '#d1d1d6',
        },
        headerStyle: { backgroundColor: '#f8f8f8' },
        headerTitleStyle: { fontWeight: 'bold' },
      })}
    >
      <Tabs.Screen 
        name="homeone" 
        options={{ title: 'Singer' }} 
      />
      <Tabs.Screen 
        name="hometwo" 
        options={{ title: 'Lyrics' }} 
      />
    </Tabs>
  );
}