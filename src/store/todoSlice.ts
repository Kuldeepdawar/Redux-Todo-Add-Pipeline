// src/store/todoSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../types"; // Import the Todo type we defined

// Define the initial state structure
interface TodoState {
  todos: Todo[]; // An array of Todo objects that will be our state
}

// Initial state for the todos slice
const initialState: TodoState = {
  todos: [], // Initially, there are no todos
};

// Create the todoSlice to handle actions like add, delete, toggle, and edit
const todoSlice = createSlice({
  name: "todos", // Name for the slice of state (todos)
  initialState, // Set the initial state
  reducers: {
    // Action to add a new todo
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload); // Add the new todo to the todos array
    },
    // Action to delete a todo by its ID
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload); // Remove the todo with matching id
    },
    // Action to toggle the completion state of a todo (mark as done or undone)
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload); // Find the todo by its ID
      if (todo) {
        todo.completed = !todo.completed; // Toggle the completed status
      }
    },
    // Action to edit a todo's text
    editTodo: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id); // Find the todo by its ID
      if (todo) {
        todo.text = action.payload.text; // Update the text of the todo
      }
    },
  },
});

// Export actions for use in components
export const { addTodo, deleteTodo, toggleTodo, editTodo } = todoSlice.actions;

// Export the reducer to be used in the store
export default todoSlice.reducer;
