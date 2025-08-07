import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@context': path.resolve(__dirname, './src/context'),
      '@ui': path.resolve(__dirname, './src/ui'),
      '@css': path.resolve(__dirname, './src/assets/css'),
      '@img': path.resolve(__dirname, './public/img'),
      '@lib': path.resolve(__dirname, './src/lib')
    }
  }
})
