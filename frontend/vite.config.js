import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,  // Asegura que está en el puerto correcto
    open: true,  // Abre automáticamente en el navegador
  },
});