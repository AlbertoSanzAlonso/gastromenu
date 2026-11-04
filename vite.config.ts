import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { gastromenuSeoPlugin } from './scripts/seo-plugin'

export default defineConfig({
  plugins: [react(), tailwindcss(), gastromenuSeoPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
