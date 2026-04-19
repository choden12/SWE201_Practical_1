import React, { useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Task, FilterType } from '../types';
import { TaskItem } from './TaskItem';
import { useTheme } from '../context/ThemeContext';

// It was  for TaskList component prop
interface TaskListProps {
  tasks: Task[]; 
  onToggle: (id: number) => void; // Toggle task completion
  onEdit: (id: number, newTitle: string) => void; 
  onClearCompleted: () => void; 
  customHeaderComponent?: React.ReactNode; 
}

// It was  component for tasklist which will display listof tasks
export function TaskList({ 
  tasks, 
  onToggle, 
  onEdit, 
  onClearCompleted,
  customHeaderComponent 
}: TaskListProps) {

  //  store selected filter (all, active, completed)
  const [filter, setFilter] = useState<FilterType>('all');

  // for theme colors
  const { colors } = useTheme();

  // It will filter tasks based on selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.done; 
    if (filter === 'completed') return task.done;
    return true; 
  });

  // It was for the task statistics
  const stats = {
    total: tasks.length, // Total tasks
    active: tasks.filter((t) => !t.done).length, 
    completed: tasks.filter((t) => t.done).length, 
  };

  const filters: FilterType[] = ['all', 'active', 'completed'];

  // It was for displaying stats and filter buttons components
  const StatsAndFilters = () => (
    <View style={{ paddingHorizontal: 20 }}>
      
      {/* Stats section */}
      <View style={[styles.statsContainer, { borderBottomColor: colors.border }]}>
        <Text style={[styles.stats, { color: colors.text }]}>
          Total: {stats.total} | Active: {stats.active} | Completed: {stats.completed}
        </Text>

        // Clear completed button 
        {stats.completed > 0 && (
          <TouchableOpacity
            style={[styles.clearButton, { borderColor: colors.border }]}
            onPress={onClearCompleted}
          >
            <Text style={[styles.clearButtonText, { color: colors.text }]}>
              Clear Completed
            </Text>
          </TouchableOpacity>
        )}
      </View>

      // It was for Filter buttons 
      <View style={styles.filterContainer}>
        {filters.map((f) => (
          <TouchableOpacity
            key={f}
            style={[
              styles.filterButton,
              filter === f && [styles.activeFilter, { backgroundColor: colors.primary }], 
              { borderColor: colors.border },
            ]}
            onPress={() => setFilter(f)} 
          >
            <Text
              style={[
                styles.filterText,
                { color: filter === f ? '#fff' : colors.text }, // Change text color when active
              ]}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)} 
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <FlatList
      data={filteredTasks} 
      keyExtractor={(item) => item.id.toString()} 

      // It will render each task item
      renderItem={({ item }) => (
        <View style={{ paddingHorizontal: 20 }}>
          <TaskItem task={item} onToggle={onToggle} onEdit={onEdit} />
        </View>
      )}

      // It was for the header component 
      ListHeaderComponent={
        <>
          {customHeaderComponent}
          <StatsAndFilters />
        </>
      }

      // It was for displaying when no tasks are available
      ListEmptyComponent={
        <Text style={[styles.emptyText, { color: colors.text + '80' }]}>
          No tasks found. Add some tasks above!
        </Text>
      }

      showsVerticalScrollIndicator={false} 

      contentContainerStyle={styles.listContent} 
    />
  );
}

// Styles for the component
const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 40, 
  },
  statsContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  stats: {
    fontSize: 14,
    marginBottom: 8,
  },
  clearButton: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 12,
  },
  filterContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  activeFilter: {
    backgroundColor: '#007AFF', 
  },
  filterText: {
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
});