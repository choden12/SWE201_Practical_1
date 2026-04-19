import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

//It was for theme toggle button 
export function ThemeToggleButton() {

  // It will get current theme, toggle function, and colors from context
  const { theme, toggleTheme, colors } = useTheme();

  return (
    // It will switch between light and dark mode
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={toggleTheme} 
    >
      <Text style={[styles.text, { color: colors.text }]}>

        // Display text based on current theme 
        {theme === 'light' ? ' Dark Mode' : ' Light Mode'}
      </Text>
    </TouchableOpacity>
  );
}

// It was for button styles
const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20, 
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center', 
    marginBottom: 15,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
});