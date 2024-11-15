import React, { useState } from "react";
import { addTodo } from "../api/todoApi";

interface TodoFormProps {
  refreshTodos: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ refreshTodos }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await addTodo({ name, isComplete: false });
      setName(""); // Wyczyść pole
      refreshTodos(); // Odśwież listę
    } catch (error) {
      console.error("Błąd podczas dodawania zadania: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Wpisz zadanie"
      />
      <button type="submit">Dodaj</button>
    </form>
  );
};

export default TodoForm;
