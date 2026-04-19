import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useLocalStorageState<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((prev: T) => T)) => Promise<void>, boolean] {
  const [value, setValue] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);

  // Load from storage on mount
  useEffect(() => {
    const loadStorage = async () => {
      try {
        const stored = await AsyncStorage.getItem(key);
        if (stored !== null) {
          setValue(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading from storage:', error);
      } finally {
        setLoading(false);
      }
    };
    loadStorage();
  }, [key]);

  // Create an async setter that updates both state and storage
  const setValueAsync = useCallback(
    async (newValue: T | ((prev: T) => T)) => {
      // Calculate the new value 
      const updatedValue = 
        typeof newValue === 'function' 
          ? (newValue as (prev: T) => T)(value)
          : newValue;
      
      // It will Update the state
      setValue(updatedValue);
      
      // Save to storage
      try {
        await AsyncStorage.setItem(key, JSON.stringify(updatedValue));
      } catch (error) {
        console.error('Error saving to storage:', error);
      }
    },
    [key, value]
  );

  return [value, setValueAsync, loading];
}