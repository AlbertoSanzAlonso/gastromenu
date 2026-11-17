import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const server = await createServer({
  root,
  configFile: false,
  server: { middlewareMode: true },
  appType: 'custom',
  resolve: {
    alias: {
      '@': path.join(root, 'src'),
    },
  },
})

try {
  const { writeSitemap } = await server.ssrLoadModule('/scripts/seo-plugin.ts')
  writeSitemap(root)
  console.log('Wrote public/sitemap.xml')
} finally {
  await server.close()
}
