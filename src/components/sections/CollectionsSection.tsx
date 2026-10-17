import { Link } from 'react-router-dom'
import { ImageCard } from '@/components/ui/ImageCard'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { GoldText } from '@/components/ui/GoldText'
import { dossierImageUrl } from '@/data/dossierTypes'

const collections = [
  {
    to: '/cartas',
    title: 'Cartas menú',
    description: 'Tapas duras, piel, tejidos y madera',
    file: 'PORTADA CARTA MARGARITA.png',
  },
  {
    to: '/atriles',
    title: 'Atriles portamenú',
    description: 'De pie, de pared y retroiluminados',
    file: 'FACHADA ALTANOUR CON PORTAMENÚ.png',
  },
  {
    to: '/manteles',
    title: 'Manteles',
    description: 'De papel y rígidos lacados a mano',
    file: 'IMAGEN CHICOS DESAYUNANDO CON MANTELES DEBAJO.png',
  },
  {
    to: '/exclusividades',
    title: 'Exclusividades',
    description: 'Porta cuentas y porta adiciones',
    file: 'PORTA ADICIONES - PORTA CUENTAS.png',
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
              imageUrl={dossierImageUrl(item.file)}
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
