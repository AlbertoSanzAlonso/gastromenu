import { Link } from 'react-router-dom'
import { ImageCard } from '@/components/ui/ImageCard'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { GoldText } from '@/components/ui/GoldText'

const collections = [
  {
    to: '/cartas',
    title: 'Cartas menú',
    description: 'Tapas duras, piel, tejidos y madera',
    imageUrl: '/images/web/inicio/01-cartas-menu-premium-1620x945.webp',
  },
  {
    to: '/atriles',
    title: 'Atriles portamenú',
    description: 'De pie, de pared y retroiluminados',
    imageUrl: '/images/web/inicio/02-atriles-portamenu-premium-1620x945.webp',
  },
  {
    to: '/manteles',
    title: 'Manteles',
    description: 'De papel y rígidos lacados a mano',
    imageUrl: '/images/web/inicio/03-manteles-premium-1620x945.webp',
  },
  {
    to: '/exclusividades',
    title: 'Exclusividades',
    description: 'Porta cuentas y porta adiciones',
    imageUrl: '/images/web/inicio/04-exclusividades-premium-1620x945.webp',
  },
]

const sectors = [
  { to: '/cartas#chiringuitos', label: 'Chiringuitos' },
  { to: '/cartas#asadores', label: 'Asadores' },
  { to: '/cartas#pizzerias', label: 'Pizzerías' },
  { to: '/cartas#etnicas', label: 'Étnicos' },
  { to: '/cartas#vinos', label: 'Vinos' },
  { to: '/cartas#postres', label: 'Postres' },
  { to: '/cartas#cocteles', label: 'Cócteles' },
]

export function CollectionsSection() {
  return (
    <Section id="coleccion" variant="beige" ariaLabel="Colecciones">
      <Heading
        as="h2"
        subtitle="Cartas, atriles, manteles y exclusividades"
        align="center"
        className="mx-auto"
      >
        Nuestra <GoldText>colección</GoldText>
      </Heading>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {collections.map((item) => (
          <Link key={item.to} to={item.to} className="block min-h-[240px] cursor-pointer">
            <ImageCard
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
              size="large"
            />
          </Link>
        ))}
      </div>

      <nav aria-label="Sectores" className="mt-12 flex flex-wrap justify-center gap-3">
        {sectors.map((sector) => (
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
