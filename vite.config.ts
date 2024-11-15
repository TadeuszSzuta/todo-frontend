import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import backend_PORT from "./src/api/todoApi";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: backend_PORT, // Możesz zmienić port, jeśli inny jest zajęty
    proxy: {
      "/todoHub": {
        target: "http://localhost:7203",
        ws: true, // WebSocket dla SignalR
        changeOrigin: true,
      },
      "/api": {
        target: "http://localhost:7203", // Adres twojego backendu
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
