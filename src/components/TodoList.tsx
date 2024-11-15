import React from "react";
import { Todo } from "../api/todoApi";

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onDelete,
  onToggleComplete,
}) => {
  return (
    <div>
      <ul className="list-group pt-4">
        {todos.map((todo) => (
          <li
            className={
              todo.isComplete
                ? "list-group-item d-flex justify-content-between completed"
                : "list-group-item d-flex justify-content-between uncompleted"
            }
            key={todo.id}
            onClick={() => onToggleComplete(todo.id)}
            style={{ cursor: "pointer" }}
          >
            <span>{`${todo.id}`}</span>
            <span>{todo.name}</span>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => onDelete(todo.id)}
            ></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
