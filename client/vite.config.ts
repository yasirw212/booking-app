import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4001',
        changeOrigin: true,
        secure: false, /* If you're connecting to https set to true, */
        rewrite: (path) => path.replace('/^\/api', '')
      }
    },
    host: '0.0.0.0',
    strictPort: true,
    port: 8081
  }
})
