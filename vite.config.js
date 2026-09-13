import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true, // bind 0.0.0.0 ให้เครื่องอื่นในวง LAN เข้าถึงได้
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
})
