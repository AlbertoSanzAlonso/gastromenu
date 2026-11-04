import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
import {
  buildJsonLd,
  documentTitle,
  OG_IMAGE,
  pageUrl,
  privatePaths,
  publicPages,
  SITE_NAME,
  SITE_URL,
  type PublicPage,
} from '../src/lib/seo/site'

const START = '<!--seo:head-->'
const END = '<!--/seo:head-->'
const ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
const IMAGE_EXT = /\.(webp|png|jpe?g|gif)$/i

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function injectHead(html: string, head: string) {
  const start = html.indexOf(START)
  const end = html.indexOf(END)
  if (start < 0 || end < start) {
    throw new Error('index.html no contiene los marcadores <!--seo:head--> y <!--/seo:head-->')
  }
  return `${html.slice(0, start + START.length)}\n${head}\n    ${html.slice(end)}`
}

function publicHead(page: PublicPage) {
  const title = documentTitle(page.title)
  const description = escapeHtml(page.description)
  const url = pageUrl(page.path)
  const image = `${SITE_URL}${OG_IMAGE.src}`
  const jsonLd = JSON.stringify(
    buildJsonLd({
      path: page.path,
      title,
      crumb: page.title,
      description: page.description,
      locale: 'es',
    }),
  ).replaceAll('<', '\\u003c')

  return `    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${description}" />
    <meta name="author" content="Fudys Gourmet SL" />
    <meta name="robots" content="${ROBOTS}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:locale" content="es_ES" />
    <meta property="og:locale:alternate" content="en_GB" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:type" content="${OG_IMAGE.type}" />
    <meta property="og:image:width" content="${OG_IMAGE.width}" />
    <meta property="og:image:height" content="${OG_IMAGE.height}" />
    <meta property="og:image:alt" content="${escapeHtml(OG_IMAGE.alt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="twitter:image:alt" content="${escapeHtml(OG_IMAGE.alt)}" />
    <script type="application/ld+json" id="ld-static">${jsonLd}</script>`
}

function privateHead() {
  const title = `Backoffice | ${SITE_NAME}`
  return `    <title>${title}</title>
    <meta name="robots" content="noindex, nofollow" />
    <meta name="googlebot" content="noindex, nofollow" />`
}

function pathnameOf(url: string) {
  const pathname = url.split('?')[0]?.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/'
  return pathname.startsWith('/') ? pathname : `/${pathname}`
}

function headForUrl(url: string) {
  const pathname = pathnameOf(url)
  if (pathname === '/admin' || pathname.startsWith('/admin/')) return privateHead()
  const page = publicPages.find((entry) => entry.path === pathname) ?? publicPages[0]
  return publicHead(page)
}

function imageTitle(filename: string) {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/^\d+-/, '')
    .replaceAll('-', ' ')
}

function imagesFor(root: string, dirs: readonly string[]) {
  const images: { loc: string; title: string }[] = []

  for (const dir of dirs) {
    const absolute = path.join(root, 'public', dir)
    if (!fs.existsSync(absolute)) continue

    for (const name of fs.readdirSync(absolute).sort()) {
      if (!IMAGE_EXT.test(name)) continue
      images.push({
        loc: `${SITE_URL}/${dir}/${encodeURIComponent(name)}`,
        title: imageTitle(name),
      })
    }
  }

  return images
}

export function renderSitemap(root: string) {
  const urls = publicPages
    .map((page) => {
      const images = imagesFor(root, page.imageDirs)
        .map(
          (image) => `    <image:image>
      <image:loc>${escapeHtml(image.loc)}</image:loc>
      <image:title>${escapeHtml(image.title)}</image:title>
    </image:image>`,
        )
        .join('\n')

      return `  <url>
    <loc>${pageUrl(page.path)}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${images ? `${images}\n` : ''}  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`
}

function writeRouteHtml(outDir: string, routePath: string, html: string) {
  if (routePath === '/') {
    fs.writeFileSync(path.join(outDir, 'index.html'), html)
    return
  }

  const dir = path.join(outDir, ...routePath.split('/').filter(Boolean))
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), html)
}

export function gastromenuSeoPlugin(): Plugin {
  let root = ''
  let outDir = ''

  return {
    name: 'gastromenu-seo',
    configResolved(config) {
      root = config.root
      outDir = path.resolve(config.root, config.build.outDir)
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0]
        if (url !== '/sitemap.xml') {
          next()
          return
        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/xml; charset=utf-8')
        res.end(renderSitemap(server.config.root))
      })
    },
    transformIndexHtml(html, ctx) {
      const url = ctx.originalUrl ?? ctx.path ?? '/'
      return injectHead(html, headForUrl(url))
    },
    closeBundle() {
      const templatePath = path.join(outDir, 'index.html')
      if (!fs.existsSync(templatePath)) return

      const template = fs.readFileSync(templatePath, 'utf8')
      for (const page of publicPages) {
        writeRouteHtml(outDir, page.path, injectHead(template, publicHead(page)))
      }
      for (const routePath of privatePaths) {
        writeRouteHtml(outDir, routePath, injectHead(template, privateHead()))
      }

      const xml = renderSitemap(root)
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml)
      fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), xml)
    },
  }
}
