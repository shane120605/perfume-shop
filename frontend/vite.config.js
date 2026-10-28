// ===== FILE: vite.config.js | PURPOSE: Vite build/dev server config =====
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: true },
})
