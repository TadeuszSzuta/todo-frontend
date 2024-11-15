import { useEffect, useState } from "react";
import { updateTodo, deleteTodo, getTodos, Todo } from "./api/todoApi";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import { HubConnectionBuilder } from "@microsoft/signalr";

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [connection, setConnection] = useState<any>(null);

  // SignalR
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:7203/todoHub", { withCredentials: false })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("Connected with SignalR!");

          connection.on("TodosUpdated", () => {
            console.log("Lista todo została zaktualizowana!");
            fetchTodos();
          });
        })
        .catch((error: unknown) => console.error("SignalR Error: ", error));
    }
  }, [connection]);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error("Error during downloading the data: ", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Todo removal error: ", error);
    }
  };

  const handleToggleComplete = async (id: number) => {
    try {
      const updatedTodo = todos.find((todo) => todo.id === id);
      if (!updatedTodo) return;

      const updatedData = {
        ...updatedTodo,
        isComplete: !updatedTodo.isComplete,
      };

      await updateTodo(updatedData);

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
        )
      ); // Zaktualizuj stan frontendowy
    } catch (error) {
      console.error("Błąd podczas aktualizacji elementu: ", error);
    }
  };

  return (
    <>
      <div className="container text-center">
        <h1>to do</h1>
        <TodoList
          todos={todos}
          onDelete={handleDeleteTodo}
          onToggleComplete={handleToggleComplete}
        />
        <TodoForm refreshTodos={fetchTodos} />
      </div>
    </>
  );
};

export default TodoApp;
