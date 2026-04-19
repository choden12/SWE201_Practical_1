import React, { createContext, useContext, useState, ReactNode } from 'react';

// It will define the theme types
type Theme = 'light' | 'dark';

// It will define the structure of ThemeContext
interface ThemeContextType {
  theme: Theme; 
  toggleTheme: () => void;
  colors: {
    background: string;
    text: string;
    card: string;
    border: string;
    primary: string;
  };
}

// It will create the context with default undefined
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// It will provide theme context to all child components
export function ThemeProvider({ children }: { children: ReactNode }) {

  // store current theme 
  const [theme, setTheme] = useState<Theme>('light');

  // It was for toggle between light and dark theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Define color schemes for both themes
  const colors = {
    light: {
      background: '#f5f5f5',
      text: '#000000',
      card: '#ffffff',
      border: '#e0e0e0',
      primary: '#007AFF',
    },
    dark: {
      background: '#1a1a1a',
      text: '#ffffff',
      card: '#2c2c2c',
      border: '#3a3a3a',
      primary: '#0A84FF',
    },
  }[theme]; 

  return (
    // It will provide theme data to all child components
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme 
export function useTheme() {
  const context = useContext(ThemeContext);

  // Throw error if used outside ThemeProvider
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  // It will return context values
  return context;
}