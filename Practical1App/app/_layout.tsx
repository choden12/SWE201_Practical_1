import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        
        // icon for tab (same icon for both tabs)
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = focused ? 'heart' : 'heart-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },

        // active tab color
        tabBarActiveTintColor: '#e91e63',

        // inactive tab color
        tabBarInactiveTintColor: '#8e8e93',

        // bottom tab styling
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 0.5,
          borderTopColor: '#d1d1d6',
        },

        // header background
        headerStyle: { backgroundColor: '#f8f8f8' },

        // header text style
        headerTitleStyle: { fontWeight: 'bold' },
      })}
    >
      
      {/* first tab - singer page */}
      <Tabs.Screen 
        name="homeone" 
        options={{ title: 'Singer' }} 
      />

      {/* second tab - lyrics page */}
      <Tabs.Screen 
        name="hometwo" 
        options={{ title: 'Lyrics' }} 
      />

    </Tabs>
  );
}