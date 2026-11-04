import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useMessages } from '@/i18n/useMessages'
import { buildJsonLd, documentTitle, OG_IMAGE, pageUrl, SITE_NAME, SITE_URL } from '@/lib/seo/site'

interface SEOProps {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article'
}

const ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

export function SEO({
  title,
  description,
  path = '/',
  image = OG_IMAGE.src,
  type = 'website',
}: SEOProps) {
  const { locale, m } = useMessages()
  const fullTitle = documentTitle(title)
  const url = pageUrl(path)
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`
  const alternateLocale = m.seo.locale === 'es_ES' ? 'en_GB' : 'es_ES'
  const jsonLd = buildJsonLd({
    path,
    title: fullTitle,
    crumb: title,
    description,
    locale,
  })

  useEffect(() => {
    document.getElementById('ld-static')?.remove()
  }, [])

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Fudys Gourmet SL" />
      <meta name="robots" content={ROBOTS} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={m.seo.locale} />
      <meta property="og:locale:alternate" content={alternateLocale} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:type" content={OG_IMAGE.type} />
      <meta property="og:image:width" content={String(OG_IMAGE.width)} />
      <meta property="og:image:height" content={String(OG_IMAGE.height)} />
      <meta property="og:image:alt" content={OG_IMAGE.alt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={OG_IMAGE.alt} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}
