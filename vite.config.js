import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        const analyticsId = process.env.VITE_GOOGLE_ANALYTICS_ID
        return html.replace(/%VITE_GOOGLE_ANALYTICS_ID%/g, analyticsId)
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
})
