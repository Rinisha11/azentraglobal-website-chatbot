import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig({
  plugins: [react()],
  base: "/",
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  server: {
    // UPDATE THIS PROXY SECTION
    proxy: {
      // 1. Catches /api requests
      '/api': {
        target: 'https://employee.azentraglobal.com',
        changeOrigin: true,
        secure: false,
      },
      // 2. Catches /tracker requests
      '/tracker': {
        target: 'https://employee.azentraglobal.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})