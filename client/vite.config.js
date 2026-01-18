import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: ['locallink.dpdns.org', 'localhost'],
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
