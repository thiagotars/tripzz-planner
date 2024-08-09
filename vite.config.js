import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/maps/api": {
        target: "https://maps.googleapis.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/maps\/api/, "/maps/api"),
      },
    },
    middleware: (req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      next();
    },
  },
});
