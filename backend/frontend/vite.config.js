import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000, // Default port for Vite dev server
//     open: true, // Automatically opens the browser when the server starts
//   }
// })


export default {
  server: {
    port: 3000, // Default port for Vite dev server
    open: true, // Automatically opens the browser when the server starts
    proxy: {
      '/api': {
        target: 'http://localhost:5001', // Ensure this is your backend API server's correct URL
        changeOrigin: true,  // Needed for virtual hosted sites
        secure: false,       // If you're using HTTP, this should be false
        rewrite: (path) => path.replace(/^\/user/, '/api'), // Optional, adjust based on your route structure
      }
    }
  }
}
