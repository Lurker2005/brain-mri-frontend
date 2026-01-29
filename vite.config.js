import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/brain-mri-frontend/", // 🔥 MUST match repo name
});
