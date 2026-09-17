import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true, // bind 0.0.0.0 ให้เครื่องอื่นในวง LAN เข้าถึงได้
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3001', // หน้า /admin เรียก server/index.js ผ่าน path นี้
    },
  },
  preview: {
    host: true,
    port: 4173,
  },
})
