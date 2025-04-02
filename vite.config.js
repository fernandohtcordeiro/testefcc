import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools' // ❌ desnecessário se não usar

export default defineConfig({
  plugins: [
    vue()
    // vueDevTools(), // ❌ remova ou comente esta linha
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
