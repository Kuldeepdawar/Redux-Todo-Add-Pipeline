import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice"; // Import your reducer

// Create the Redux store
const store = configureStore({
  reducer: {
    todos: todoReducer, // Assign todo reducer
  },
});

// Define RootState type based on the store's state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
