interface PageRow {
  slug: string
  path: string
  seo_title: string
  seo_description: string
  kicker: string
  title: string
  emphasis: string | null
  lead: string
}

interface SectionRow {
  id: string
  section_key: string
  nav: string
  kicker: string
  title: string
  emphasis: string | null
  variant: 'light' | 'dark' | 'beige'
}

interface TextRow {
  section_id: string
  sort_order: number
  body: string
}

interface ImageRow {
  section_id: string
  sort_order: number
  r2_key: string
  caption: string
}

interface Statement {
  bind(...values: unknown[]): Statement
  first<T>(): Promise<T | null>
  all<T>(): Promise<{ results: T[] }>
}

interface Env {
  DB: {
    prepare(query: string): Statement
  }
  MEDIA: {
    get(key: string): Promise<{
      body: ReadableStream
      httpMetadata?: { contentType?: string }
    } | null>
  }
}

const corsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, OPTIONS',
  'access-control-allow-headers': 'content-type',
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    if (request.method !== 'GET') {
      return json({ error: 'Método no permitido' }, 405)
    }

    const url = new URL(request.url)

    if (url.pathname === '/api/health') {
      return json({ ok: true })
    }

    if (url.pathname === '/api/content') {
      const listed = await env.DB.prepare(
        `SELECT slug, path, seo_title, kicker, title
         FROM pages
         ORDER BY sort_order`,
      ).all<{
        slug: string
        path: string
        seo_title: string
        kicker: string
        title: string
      }>()

      return json({ pages: listed.results })
    }

    if (url.pathname.startsWith('/api/media/')) {
      const key = decodeURIComponent(url.pathname.slice('/api/media/'.length))
      const object = await env.MEDIA.get(key)
      if (!object) return json({ error: 'Imagen no encontrada' }, 404)

      return new Response(object.body, {
        headers: {
          ...corsHeaders,
          'content-type': object.httpMetadata?.contentType || contentTypeFor(key),
          'cache-control': 'public, max-age=31536000, immutable',
        },
      })
    }

    const match = url.pathname.match(/^\/api\/content\/([a-z0-9-]+)$/)
    if (!match) return json({ error: 'Ruta no encontrada' }, 404)

    const slug = match[1]
    const page = await env.DB.prepare(
      `SELECT slug, path, seo_title, seo_description, kicker, title, emphasis, lead
       FROM pages
       WHERE slug = ?`,
    )
      .bind(slug)
      .first<PageRow>()

    if (!page) return json({ error: 'Página no encontrada' }, 404)

    const sections = await env.DB.prepare(
      `SELECT id, section_key, nav, kicker, title, emphasis, variant
       FROM sections
       WHERE page_slug = ?
       ORDER BY sort_order`,
    )
      .bind(slug)
      .all<SectionRow>()

    const paragraphs = await env.DB.prepare(
      `SELECT section_id, sort_order, body
       FROM section_paragraphs
       WHERE section_id IN (SELECT id FROM sections WHERE page_slug = ?)
       ORDER BY sort_order`,
    )
      .bind(slug)
      .all<TextRow>()

    const highlights = await env.DB.prepare(
      `SELECT section_id, sort_order, body
       FROM section_highlights
       WHERE section_id IN (SELECT id FROM sections WHERE page_slug = ?)
       ORDER BY sort_order`,
    )
      .bind(slug)
      .all<TextRow>()

    const images = await env.DB.prepare(
      `SELECT section_id, sort_order, r2_key, caption
       FROM section_images
       WHERE section_id IN (SELECT id FROM sections WHERE page_slug = ?)
       ORDER BY sort_order`,
    )
      .bind(slug)
      .all<ImageRow>()

    const paragraphsBySection = groupText(paragraphs.results)
    const highlightsBySection = groupText(highlights.results)
    const imagesBySection = groupImages(images.results, request.url)

    return json({
      path: page.path,
      seoTitle: page.seo_title,
      seoDescription: page.seo_description,
      kicker: page.kicker,
      title: page.title,
      ...(page.emphasis ? { emphasis: page.emphasis } : {}),
      lead: page.lead,
      sections: sections.results.map((section) => ({
        id: section.section_key,
        nav: section.nav,
        kicker: section.kicker,
        title: section.title,
        ...(section.emphasis ? { emphasis: section.emphasis } : {}),
        paragraphs: paragraphsBySection.get(section.id) ?? [],
        ...(highlightsBySection.has(section.id)
          ? { highlights: highlightsBySection.get(section.id) }
          : {}),
        images: imagesBySection.get(section.id) ?? [],
        variant: section.variant,
      })),
    })
  },
}

function groupText(rows: TextRow[]) {
  const grouped = new Map<string, string[]>()
  for (const row of rows) {
    const list = grouped.get(row.section_id) ?? []
    list.push(row.body)
    grouped.set(row.section_id, list)
  }
  return grouped
}

function groupImages(rows: ImageRow[], requestUrl: string) {
  const grouped = new Map<string, { file: string; caption: string; src: string }[]>()
  for (const row of rows) {
    const list = grouped.get(row.section_id) ?? []
    list.push({
      file: row.r2_key,
      caption: row.caption,
      src: new URL(`/api/media/${encodeURIComponent(row.r2_key)}`, requestUrl).toString(),
    })
    grouped.set(row.section_id, list)
  }
  return grouped
}

function contentTypeFor(key: string) {
  const extension = key.split('.').pop()?.toLowerCase()
  if (extension === 'png') return 'image/png'
  if (extension === 'jpg' || extension === 'jpeg') return 'image/jpeg'
  if (extension === 'webp') return 'image/webp'
  if (extension === 'gif') return 'image/gif'
  return 'application/octet-stream'
}

function json(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      ...corsHeaders,
      'cache-control': 'public, max-age=60',
    },
  })
}
