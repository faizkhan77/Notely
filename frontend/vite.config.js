import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/static/', // Set the base URL to "/static/"
  build: {
    outDir: 'dist', // Output directory for the build
    assetsDir: '',  // Place all assets (CSS, JS, etc.) directly in the root of `dist`
    rollupOptions: {
      output: {
        assetFileNames: '[name].[ext]', // Prevents adding 'hashes' to filenames
        entryFileNames: '[name].js',   // Ensures consistent JS filenames
      },
    },
  },
  server: {
    proxy: {
        '/api': {
            target: 'http://127.0.0.1:8000', // Your backend server
            changeOrigin: true,
            secure: false,
        },
    },
},
})
