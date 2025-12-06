import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],

    build: {
        outDir: 'dist',
        sourcemap: false,
        minify: 'esbuild', // ✅ Utiliser esbuild au lieu de terser
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    'mui-vendor': ['@mui/material', '@mui/icons-material'],
                    'stripe-vendor': ['@stripe/stripe-js', '@stripe/react-stripe-js'],
                    'supabase-vendor': ['@supabase/supabase-js']
                }
            }
        }
    },

    server: {
        port: 5173,
        strictPort: false,
        host: true,
        open: true
    },

    preview: {
        port: 4173,
        strictPort: false,
        host: true
    }
})