import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration for Eatrite web app
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})