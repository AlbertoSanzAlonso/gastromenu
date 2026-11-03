import { siteContentDefaults } from '@/features/content/catalog'
import { useSiteContent } from '@/features/content/hooks/useSiteContent'
import { useMessages } from '@/i18n/useMessages'

const copyKey = {
  hero_title: 'heroTitle',
  hero_quote: 'heroQuote',
  about_text: 'about',
} as const

export function useSiteCopy() {
  const { locale, m } = useMessages()
  const { read } = useSiteContent()

  function text(key: keyof typeof copyKey) {
    const spanish = siteContentDefaults[key]
    const stored = read(key, spanish)
    if (locale === 'en' && stored === spanish) return m.site[copyKey[key]]
    return stored
  }

  return { text }
}
