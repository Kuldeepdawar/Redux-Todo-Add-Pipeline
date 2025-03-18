import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, toggleTodo, editTodo } from "../store/todoSlice";
import { RootState } from "../store/store"; // Import your RootState type
import { Todo } from "../types";

// The main component for the To-Do List
const TodoApp: React.FC = () => {
  const todos: Todo[] = useSelector((state: RootState) => state.todos.todos); // Use proper type for state
  const dispatch = useDispatch();
  const [input, setInput] = useState<string>("");
  const [editMode, setEditMode] = useState<{ id: number; text: string } | null>(
    null
  );

  const handleAdd = () => {
    if (input.trim() === "") return;
    const newTodo: Todo = { id: Date.now(), text: input, completed: false };
    dispatch(addTodo(newTodo));
    setInput("");
  };

  const toggleCompleted = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (id: number) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setEditMode({ id: todoToEdit.id, text: todoToEdit.text });
      setInput(todoToEdit.text);
    }
  };

  const handleSaveEdit = () => {
    if (editMode) {
      dispatch(editTodo({ id: editMode.id, text: input }));
      setEditMode(null);
      setInput("");
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={editMode ? handleSaveEdit : handleAdd}>
        {editMode ? "Save" : "Add"}
      </button>

      <ul>
        {/* Ensure todos is an array before calling map */}
        {todos?.length > 0 ? (
          todos.map((todo: Todo) => (
            <li
              key={todo.id}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              <span onClick={() => toggleCompleted(todo.id)}>{todo.text}</span>
              <button onClick={() => handleEdit(todo.id)}>Edit</button>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No tasks available.</p>
        )}
      </ul>
    </div>
  );
};

export default TodoApp;
