import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/services': {
        target: 'http://127.0.0.1:5555',
        changeOrigin: true,
        secure: false,
      },
      '/categories': {
        target: 'http://127.0.0.1:5555',
        changeOrigin: true,
        secure: false,
      },
      '/bookings': {
        target: 'http://127.0.0.1:5555',
        changeOrigin: true,
        secure: false,
      },
      '/users': {
        target: 'http://127.0.0.1:5555',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
