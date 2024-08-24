// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    proxy: {
      // Proxy all requests starting with /api to the Google Places API
      '/api': {
        target: 'https://places.googleapis.com', // Target API base URL
        changeOrigin: true, // Changes the origin of the host header to the target URL
        rewrite: (path) => path.replace(/^\/api/, ''), // Removes /api prefix when forwarding the request
      },
    },
  },
});
