import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  
  define: {
    "process.env": {},
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
    // proxy: {
    //   // Proxy requests starting with /tickets to the backend server
    //   // "/tickets": {
    //   //   target: "http://localhost:3000", // Backend server URL
    //   //   changeOrigin: true,
    //   // },
    //   // "/api": {
    //   //   target: "http://localhost:3001", // Your backend server
    //   //   changeOrigin: true,
    //   //   rewrite: (path) => path.replace(/^\/api/, ""), // Removes "/api" prefix
    //   // },
    //   // "/admin/login": {
    //   //   target: "http://localhost:3000", // Backend server URL
    //   //   changeOrigin: true,
    //   // }
        
        
      
    // },
    headers: {
      "Content-Security-Policy": "frame-ancestors 'self' https://voice-widget.hume.ai"
    },
    
  },
})
