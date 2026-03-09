import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Add bundle visualizer (run with: npm run analyze)
    process.env.ANALYZE && visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 600, // Slightly above your current size
    
    rollupOptions: {
      output: {
        manualChunks: {
          // React core (large but essential)
          'vendor-react': ['react', 'react-dom', 'react/jsx-runtime'],
          
          // Router
          'vendor-router': ['react-router-dom'],
          
          // State management
          'vendor-state': ['zustand', '@tanstack/react-query', '@tanstack/react-query-devtools'],
          
          // Forms and validation
          'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          
          // Charts (usually large)
          'vendor-charts': ['chart.js', 'react-chartjs-2'],
          
          // Icons (can be large)
          'vendor-icons': ['lucide-react', 'react-icons'],
          
          // UI utilities
          'vendor-ui': ['react-hot-toast', 'react-toastify'],
        },
        
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    },
    
    target: 'es2020',
    cssCodeSplit: true,
    reportCompressedSize: true,
  },
  
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'zustand',
      '@tanstack/react-query',
      'react-hook-form',
      'zod'
    ],
  },
})