import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { gastromenuSeoPlugin } from './scripts/seo-plugin'

function deferStylesheetPlugin() {
  return {
    name: 'defer-stylesheet',
    transformIndexHtml: {
      order: 'post' as const,
      handler(html: string) {
        return html.replace(
          /<link rel="stylesheet"(\s[^>]*href="[^"]+\.css"[^>]*)>/g,
          [
            '<link rel="preload" as="style"$1 onload="this.onload=null;this.rel=\'stylesheet\'">',
            '<noscript><link rel="stylesheet"$1></noscript>',
          ].join(''),
        )
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), gastromenuSeoPlugin(), deferStylesheetPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    cssCodeSplit: true,
    modulePreload: {
      resolveDependencies(_filename, deps) {
        return deps.filter((dep) => !dep.includes('vendor-supabase'))
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('@supabase')) return 'vendor-supabase'
          if (
            id.includes('react-dom') ||
            id.includes('react-router') ||
            id.includes('/react/') ||
            id.includes('\\react\\')
          ) {
            return 'vendor-react'
          }
          if (id.includes('react-helmet-async')) return 'vendor-helmet'
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8787',
        changeOrigin: true,
      },
    },
  },
})

