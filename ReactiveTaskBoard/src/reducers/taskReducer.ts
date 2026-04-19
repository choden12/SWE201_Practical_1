import { TaskState, TaskAction } from '../types';

// it was initial point for tasks
export const initialTaskState: TaskState = {
  tasks: [], 
};

// The reducer function will manage task 
export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {

    // It will load tasks from storage 
    case 'LOAD_FROM_STORAGE':
      return { ...state, tasks: action.tasks };

    // It will add a new task to the list
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.task] };

    // It will toggle the done status of a task
    case 'TOGGLE_DONE':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id
            ? { ...task, done: !task.done } 
            : task
        ),
      };

    // It will remove all completed tasks
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        tasks: state.tasks.filter((task) => !task.done),
      };

    // It will edit the title of a specific task
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id
            ? { ...task, title: action.title } 
            : task
        ),
      };

    default:
      return state;
  }
}