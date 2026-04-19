import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../context/ThemeContext';

// it will define the type for props 
interface TaskInputProps {
  onAddTask: (task: { title: string; priority: 'low' | 'normal' | 'high' }) => void;
}

// It was for main component
export function TaskInput({ onAddTask }: TaskInputProps) {

  // For task title
  const [title, setTitle] = useState('');
  // For task priority
  const [priority, setPriority] = useState<'low' | 'normal' | 'high'>('normal');
  const { colors } = useTheme();

  // IT was for function to handle adding a task
  const handleSubmit = () => {

    // check if the inout is empty or not
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    // it will call parent function to add task
    onAddTask({ title: title.trim(), priority });
    setTitle(''); // input reset
    setPriority('normal');
  };
   
  // it will cear the input
  const handleClear = () => {
    setTitle('');
  };

  return (
    // It was main container with background colour
    <View style={[styles.container, { backgroundColor: colors.card }]}>

      // task title input
      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        placeholder="Enter task title..."
        placeholderTextColor={colors.text + '80'}
        value={title}
        onChangeText={setTitle}
      />

      // It will contain picker and buttons in row
      <View style={styles.row}>
        <View style={styles.pickerContainer}>
          <Picker

          //it was for dropdown to slect the priority
            selectedValue={priority}
            onValueChange={(itemValue) => setPriority(itemValue)}
            style={[styles.picker, { color: colors.text }]}
            dropdownIconColor={colors.text}
          >
            <Picker.Item label="🔵 Low" value="low" />
            <Picker.Item label="🟢 Normal" value="normal" />
            <Picker.Item label="🔴 High" value="high" />
          </Picker>
        </View>

        // it will add the button
        <TouchableOpacity
          style={[styles.button, styles.addButton, { backgroundColor: colors.primary }]}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>

        // it will add the button 
        <TouchableOpacity
          style={[styles.button, styles.clearButton, { borderColor: colors.border }]}
          onPress={handleClear}
        >
          <Text style={[styles.buttonText, { color: colors.text }]}>Clear</Text>
        </TouchableOpacity>
      </View>

      // It will shows current input
      <Text style={[styles.preview, { color: colors.text + '80' }]}>
        Preview: "{title || '(empty)'}" - Priority: {priority}
      </Text>
    </View>
  );
}

// styles for the components
const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pickerContainer: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#007AFF',
  },
  clearButton: {
    borderWidth: 1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  preview: {
    marginTop: 10,
    fontSize: 12,
    fontStyle: 'italic',
  },
});