import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Możesz zmienić port, jeśli inny jest zajęty
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
