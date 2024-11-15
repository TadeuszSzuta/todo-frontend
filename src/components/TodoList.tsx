import React from "react";
import { Todo } from "../api/todoApi";

interface TodoListProps {
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <span>{todo.name}</span>
          <span>{todo.isComplete ? " ✔" : " ❌"}</span>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
