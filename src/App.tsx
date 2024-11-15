import React, { useEffect, useState } from "react";
import { getTodos, Todo } from "./api/todoApi";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import { HubConnectionBuilder } from "@microsoft/signalr";

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // Typuj stan
  const [connection, setConnection] = useState<any>(null); // Dodano typowanie dla połączenia

  // Konfiguracja SignalR
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:7203/todoHub", { withCredentials: false }) // URL SignalR
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  // Start SignalR i nasłuchuj aktualizacji
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("Połączono z SignalR!");

          // Nasłuchiwanie na zdarzenie aktualizacji
          connection.on("TodosUpdated", () => {
            console.log("Lista todo została zaktualizowana!");
            fetchTodos(); // Pobierz aktualne dane
          });
        })
        .catch((error: unknown) => console.error("SignalR Error: ", error));
    }
  }, [connection]);

  // Pobierz listę todos
  const fetchTodos = async () => {
    try {
      const data = await getTodos(); // Użyj warstwy API
      setTodos(data);
    } catch (error) {
      console.error("Błąd podczas pobierania danych: ", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <svg
        height="100"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-11.5 -10.23174 23 20.46348"
      >
        <title>React Logo</title>
        <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
        <g stroke="#61dafb" stroke-width="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>

      <h1>Todo List</h1>
      <TodoList todos={todos} />
      <TodoForm refreshTodos={fetchTodos} />
    </div>
  );
};

export default TodoApp;
