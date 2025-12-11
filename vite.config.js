import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  base: "/quiz-app",
  build: {
    rollupOptions: {
      external: [
        // Add the name of the module that the warning specifies here:
        "name-of-the-problematic-module",
        // Example for React/Vue if needed:
        "react",
        "vue",
      ],
      output: {
        // You may also need to configure globals if the module is a UMD/IIFE
        globals: {
          "name-of-the-problematic-module": "ModuleNameGlobal",
        },
      },
    },
  },
});
