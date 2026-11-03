import { Link } from 'react-router-dom'
import { ImageCard } from '@/components/ui/ImageCard'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { GoldText } from '@/components/ui/GoldText'
import { useMessages } from '@/i18n/useMessages'

const collectionPaths = ['/cartas', '/atriles', '/manteles', '/exclusividades']
const collectionImages = [
  '/images/web/inicio/01-cartas-menu-premium-1620x945.webp',
  '/images/web/inicio/02-atriles-portamenu-premium-1620x945.webp',
  '/images/web/inicio/03-manteles-premium-1620x945.webp',
  '/images/web/inicio/04-exclusividades-premium-1620x945.webp',
]

export function CollectionsSection() {
  const { m } = useMessages()

  return (
    <Section id="coleccion" variant="beige" ariaLabel={m.home.collectionsLabel}>
      <Heading
        as="h2"
        subtitle={m.home.collectionsSubtitle}
        align="center"
        className="mx-auto"
      >
        {m.home.collectionsTitleBefore} <GoldText>{m.home.collectionsTitleAccent}</GoldText>
      </Heading>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {m.home.collectionCards.map((item, index) => (
          <Link key={collectionPaths[index]} to={collectionPaths[index]} className="block min-h-[240px] cursor-pointer">
            <ImageCard
              title={item.title}
              description={item.description}
              imageUrl={collectionImages[index]}
              size="large"
            />
          </Link>
        ))}
      </div>

      <nav aria-label={m.home.sectors} className="mt-12 flex flex-wrap justify-center gap-3">
        {m.home.sectorLinks.map((sector) => (
          <Link
            key={sector.to}
            to={sector.to}
            className="slide-label border border-gold-slide/30 px-4 py-2 hover:border-gold-slide hover:text-gold-dark transition-colors duration-400"
          >
            {sector.label}
          </Link>
        ))}
      </nav>
    </Section>
  )
}
