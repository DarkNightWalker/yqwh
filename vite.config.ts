// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src', // 直接使用绝对路径字符串，不依赖 path
    },
  },
})
