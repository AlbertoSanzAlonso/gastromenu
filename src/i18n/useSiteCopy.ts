import { siteContentDefaults } from '@/features/content/catalog'
import { useSiteContent } from '@/features/content/hooks/useSiteContent'
import { useMessages } from '@/i18n/useMessages'

const previousAbout =
  'En GastroMenú Premium llevamos 28 años trabajando para restaurantes que entienden que cada detalle cuenta.\n\nDiseñamos y fabricamos cartas de menú, manteles personalizados tanto rígidos como descartables y atriles portamenús de acero, que combinan diseño, artesanía y materiales de alta calidad. Piel, semipiel, tejidos, maderas seleccionadas, tapas rígidas, Alubond y acero son algunos de los materiales con los que damos forma a soluciones pensadas específicamente para el mundo de la restauración.\n\nPor eso desarrollamos productos personalizados que no solo cumplen una función, sino que comunican el carácter del establecimiento, refuerzan su identidad y contribuyen a crear una experiencia coherente desde el primer contacto.\n\n28 años de experiencia. Diseño personalizado. Fabricación artesanal.'

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
    if (key === 'about_text' && (stored === spanish || stored === previousAbout)) {
      return m.site.about
    }
    if (locale === 'en' && stored === spanish) return m.site[copyKey[key]]
    return stored
  }

  return { text }
}
