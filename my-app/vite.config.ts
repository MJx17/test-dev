import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
         api: 'modern-compiler'
      }
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Group all node_modules libraries into a 'vendor' chunk
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
});
