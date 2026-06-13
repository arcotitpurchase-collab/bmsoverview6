import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/bmsdashboard1/",
  plugins: [react()],
});