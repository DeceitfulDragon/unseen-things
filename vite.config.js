import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: process.env.NODE_ENV === 'production'
  ? '/unseen-things/'
  : '/',
  plugins: [vue(), tailwindcss(),],
})
