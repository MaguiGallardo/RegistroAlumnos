import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['json2csv'], // Añadido para asegurar que Vite resuelva correctamente la dependencia
  },
})
