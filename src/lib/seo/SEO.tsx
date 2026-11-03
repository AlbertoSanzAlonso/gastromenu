import { Helmet } from 'react-helmet-async'
import { useMessages } from '@/i18n/useMessages'

interface SEOProps {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article'
}

const SITE_NAME = 'GASTROMENU'
const SITE_URL = 'https://gastromenupremium.com'

export function SEO({
  title,
  description,
  path = '/',
  image = '/og-image.png',
  type = 'website',
}: SEOProps) {
  const { m } = useMessages()
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`
  const url = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={`${SITE_URL}${image}`} />
      <meta property="og:locale" content={m.seo.locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}${image}`} />
    </Helmet>
  )
}
