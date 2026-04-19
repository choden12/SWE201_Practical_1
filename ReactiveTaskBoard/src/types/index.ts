// It define the structure of a Task object
export interface Task {
  id: number; 
  title: string; 
  priority: 'low' | 'normal' | 'high'; 
  done: boolean; 
  createdAt: Date; 
}

// It define all possible actions for task reducer
export type TaskAction =
  | { type: 'LOAD_FROM_STORAGE'; tasks: Task[] }
  | { type: 'ADD_TASK'; task: Task } 
  | { type: 'TOGGLE_DONE'; id: number } 
  | { type: 'CLEAR_COMPLETED' } 
  | { type: 'EDIT_TASK'; id: number; title: string }; 

// It define the shape of task 
export interface TaskState {
  tasks: Task[]; 
}

// It define filter types for displaying tasks
export type FilterType = 'all' | 'active' | 'completed';