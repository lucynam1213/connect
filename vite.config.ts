import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// GitHub Pages serves the app at https://<user>.github.io/connect/, so production
// builds need the base path '/connect/'. Dev mode stays at '/'.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/connect/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
}))
