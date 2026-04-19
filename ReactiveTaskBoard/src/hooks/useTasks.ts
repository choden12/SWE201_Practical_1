import { useCallback } from 'react';
import { useLocalStorageState } from './useLocalStorageState';
import { Task } from '../types';

// it was custom hook which manage the tasks
export function useTasks() {

  // It will load tasks from local storage with initial empty array
  const [tasks, setTasks, loading] = useLocalStorageState<Task[]>('tasks', []);

  // It was function to add a new task
  const addTask = useCallback((task: Omit<Task, 'id' | 'done' | 'createdAt'>) => {

    // It will create a new object task 
    const newTask = {
      ...task,
      id: Date.now(), 
      done: false, 
      createdAt: new Date(), 
    };

    // It will update task list
    setTasks((prev) => [...prev, newTask]);
  }, [setTasks]);

  //  to toggle task completion status
  const toggleDone = useCallback((id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, done: !task.done } 
          : task
      )
    );
  }, [setTasks]);

  // it will remove all completed tasks
  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((task) => !task.done));
  }, [setTasks]);

  // it will edit task title
  const editTask = useCallback((id: number, title: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, title }
          : task
      )
    );
  }, [setTasks]);

  // it will return all task data and functions
  return {
    tasks,
    loading,
    addTask,
    toggleDone,
    clearCompleted,
    editTask,
  };
}