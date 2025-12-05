// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],

    // Configuration build pour Vercel
    build: {
        outDir: 'dist',
        sourcemap: false, // Désactiver en production pour plus de sécurité
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true, // Retirer les console.log en production
                drop_debugger: true
            }
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    // Code splitting pour optimiser le chargement
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    'mui-vendor': ['@mui/material', '@mui/icons-material'],
                    'stripe-vendor': ['@stripe/stripe-js', '@stripe/react-stripe-js'],
                    'supabase-vendor': ['@supabase/supabase-js']
                }
            }
        },
        chunkSizeWarningLimit: 1000
    },

    // Configuration serveur dev
    server: {
        port: 5173,
        strictPort: false,
        host: true,
        open: true
    },

    // Configuration preview
    preview: {
        port: 4173,
        strictPort: false,
        host: true
    },

    // Optimisations
    optimizeDeps: {
        include: [
            'react',
            'react-dom',
            'react-router-dom',
            '@mui/material',
            '@mui/icons-material',
            '@stripe/stripe-js',
            '@stripe/react-stripe-js',
            '@supabase/supabase-js'
        ]
    }
})