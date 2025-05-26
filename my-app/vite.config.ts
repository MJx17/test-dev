import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // This allows access from any device on the local network
    port: 5173,        // Default port (can change if necessary)
  },
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
        manualChunks(id:any) {
          // Group all node_modules libraries into a 'vendor' chunk
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
});
