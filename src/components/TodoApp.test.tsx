// src/components/TodoApp.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store/store";
import TodoApp from "./TodoApp";

describe("TodoApp Component", () => {
  test("renders To-Do List heading", () => {
    render(
      <Provider store={store}>
        <TodoApp />
      </Provider>
    );

    expect(screen.getByText(/To-Do List/i)).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(
      <Provider store={store}>
        <TodoApp />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText("Add a new task");
    const addButton = screen.getByText("Add");

    fireEvent.change(inputElement, { target: { value: "Learn Redux" } });
    fireEvent.click(addButton);

    expect(screen.getByText("Learn Redux")).toBeInTheDocument();
  });

  test("toggles todo completion", () => {
    render(
      <Provider store={store}>
        <TodoApp />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText("Add a new task");
    const addButton = screen.getByText("Add");

    fireEvent.change(inputElement, { target: { value: "Test Redux" } });
    fireEvent.click(addButton);

    const todoItem = screen.getByText("Test Redux");
    fireEvent.click(todoItem);

    expect(todoItem).toHaveStyle("text-decoration: line-through");
  });

  test("deletes a todo", () => {
    render(
      <Provider store={store}>
        <TodoApp />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText("Add a new task");
    const addButton = screen.getByText("Add");

    fireEvent.change(inputElement, { target: { value: "Delete Me" } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Delete Me")).not.toBeInTheDocument();
  });
});
