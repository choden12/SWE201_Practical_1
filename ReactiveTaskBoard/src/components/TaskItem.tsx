import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { Task } from '../types';
import { useTheme } from '../context/ThemeContext';


// it was for taskitem component props
interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
}

// It was for taskitem component
export function TaskItem({ task, onToggle, onEdit }: TaskItemProps) {
   // To check if task is in editing mode
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const { colors } = useTheme();

// priority color mapping
  const priorityColors = {
    low: '#4CAF50',
    normal: '#FFC107',
    high: '#F44336',
  };
// it will handle edit submission 
  const handleEdit = () => {
    // it will check if edited title is not empty
    if (editTitle.trim()) {
      onEdit(task.id, editTitle.trim());
      setIsEditing(false);
    } else {
      Alert.alert('Error', 'Task title cannot be empty');
    }
  };

  // function to calculate time
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - new Date(date).getTime()) / 60000);
    if (diffMinutes < 1) return 'just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    // It was main container 
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      // check the task is done or not
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => onToggle(task.id)}
      >
        <View style={[styles.checkboxInner, task.done && styles.checkboxChecked]} />
      </TouchableOpacity>

      <View style={styles.content}>

        // shows the editing mode is active
        {isEditing ? (
          <TextInput
            style={[styles.editInput, { color: colors.text, borderColor: colors.border }]}
            value={editTitle}
            onChangeText={setEditTitle}
            onBlur={handleEdit}
            onSubmitEditing={handleEdit}
            autoFocus
          />
        ) : (

          // it was for normal dispalay mode
        
          <TouchableOpacity onLongPress={() => setIsEditing(true)}>
            <Text
              style={[
                styles.title,
                { color: colors.text },
                task.done && styles.completed,
              ]}
            >
              {task.title}
            </Text>
          </TouchableOpacity>
        )}
        <View style={styles.meta}>
          <View style={[styles.priorityBadge, { backgroundColor: priorityColors[task.priority] + '20' }]}>
            <Text style={[styles.priorityText, { color: priorityColors[task.priority] }]}>
              {task.priority.toUpperCase()}
            </Text>
          </View>
          <Text style={[styles.timeAgo, { color: colors.text + '80' }]}>
            {getTimeAgo(task.createdAt)}
          </Text>
        </View>
      </View>
    </View>
  );
}

// style for the components
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 12,
  },
  checkboxInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
  },
  completed: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  editInput: {
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 4,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  timeAgo: {
    fontSize: 10,
  },
});