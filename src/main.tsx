import React from "react";
import ReactDOM from "react-dom/client"; // W React 18 używamy `react-dom/client`
import App from "./App"; // Importujemy główny komponent aplikacji

// Tworzymy "root" aplikacji, który będzie odpowiadał za jej renderowanie
const rootElement = document.getElementById("root") as HTMLElement; // Upewniamy się, że element o id="root" istnieje

// Jeśli aplikacja działa na React 18, używamy createRoot do renderowania
const root = ReactDOM.createRoot(rootElement);

// Renderujemy komponent App
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
