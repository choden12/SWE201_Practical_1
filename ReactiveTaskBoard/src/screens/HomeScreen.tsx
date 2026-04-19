import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TaskInput } from '../components/TaskInput';
import { TaskList } from '../components/TaskList';
import { ThemeToggleButton } from '../components/ThemeToggleButton';
import { useTasks } from '../hooks/useTasks';
import { useTheme } from '../context/ThemeContext';

// It was main Home Screen 
export function HomeScreen() {

  // Get task-related data and functions from custom hook
  const { tasks, addTask, toggleDone, editTask, clearCompleted } = useTasks();

  // for theme colors
  const { colors } = useTheme();

  // Effect to run whenever number of tasks changes
  useEffect(() => {
    console.log(`📱 App title updated: ${tasks.length} tasks`);
  }, [tasks.length]);

  // It was for header component 
  const HeaderComponent = () => (
    <View style={{ paddingHorizontal: 20 }}>
      
      // It was for header title and theme toggle 
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Task DashBoard
        </Text>

        // it was for button to toggle light or dark theme 
        <ThemeToggleButton />
      </View>

      // For input component to add new tasks 
      <TaskInput onAddTask={addTask} />
    </View>
  );

  return (
    // It was main container with dynamic background color
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      // It was for task list component 
      <TaskList
        tasks={tasks} 
        onToggle={toggleDone} 
        onEdit={editTask}
        onClearCompleted={clearCompleted} 
        customHeaderComponent={<HeaderComponent />} 
      />
    </View>
  );
}

//it was for  screen styles
const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  header: {
    marginBottom: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
});