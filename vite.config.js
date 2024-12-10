import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from 'path'

export default defineConfig({
  assetsInclude: ['**/*.html'],
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: [
      '@chakra-ui/react',
      '@chakra-ui/system',
      '@emotion/react',
      '@emotion/styled',
      'framer-motion',
    ],
  },
  
  server: {
    port: 3000,
    open: true, 
    proxy: {
      "/api": {
        target: "http://localhost:5000", 
        changeOrigin: true,
        secure: false,
      },
    },
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});