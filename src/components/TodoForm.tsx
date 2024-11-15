import React, { useState } from "react";
import { addTodo } from "../api/todoApi";

interface TodoFormProps {
  refreshTodos: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ refreshTodos }) => {
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true); // Track validity

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim()) {
      setIsValid(false);
      return;
    }

    try {
      await addTodo({ name, isComplete: false });
      setName("");
      setIsValid(true);
      refreshTodos();
    } catch (error) {
      console.error("Error adding todo: ", error);
    }
  };

  return (
    <form
      className="row g-3 needs-validation container justify-content-center pt-4 d-flex"
      noValidate
      onSubmit={handleSubmit}
    >
      <label htmlFor="ValidationCustom01" className="form-label">
        Add your task here:
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={`form-control ${!isValid ? "is-invalid" : ""}`}
        id="validationCustom01"
        placeholder="Desctiption"
        required
      />
      {!isValid && (
        <div className="invalid-feedback">Input field cannot be empty</div>
      )}

      <button type="submit" className="btn btn-primary col-sm-1">
        Add
      </button>
    </form>
  );
};

export default TodoForm;
