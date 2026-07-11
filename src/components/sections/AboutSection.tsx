import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { GoldText } from '@/components/ui/GoldText'

const values = [
  {
    title: 'Premium',
    description: 'Materiales nobles y acabados que transmiten distinción desde el primer contacto.',
  },
  {
    title: 'Exquisitez',
    description: 'Cada detalle —desde el troquel hasta el stamping en oro— es pensado con cuidado.',
  },
  {
    title: 'Compromiso',
    description: 'Desde 1998 interpretamos sus gustos para consolidar la imagen de su establecimiento.',
  },
]

export function AboutSection() {
  return (
    <Section id="nosotros" variant="dark" ariaLabel="Sobre nosotros">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <div>
          <Heading as="h2" subtitle="Desde 1998">
            Potenciar sus ventas,
            <br />
            consolidar su <GoldText>imagen</GoldText>
          </Heading>

          <blockquote className="relative slide-body text-xl md:text-2xl max-w-xl mb-8 pl-6 border-l border-gold-slide/40">
            <span className="slide-accent text-4xl leading-none absolute -left-1 -top-2" aria-hidden>
              "
            </span>
            Como un traje a medida, la carta que{' '}
            <GoldText>sirve en la mesa</GoldText> comunica no solo platos, sino quién eres.
          </blockquote>

          <div className="space-y-6 slide-body max-w-xl">
            <p>
              Deseamos ayudarle a potenciar sus ventas y a consolidar su imagen.
              Apoyamos al sector gastronómico con los mejores materiales y diseños
              adaptados a sus cartas y manteles.
            </p>
            <p>
              Interpretamos sus gustos y hacemos nuestros sus proyectos, para que vean
              no solo incrementar sus ventas, sino también consolidar la imagen de
              su establecimiento ante sus comensales.
            </p>
            <p className="text-cream">
              Confíe en <span className="brand-title text-base gold-shimmer not-italic">GASTROMENU</span>.
            </p>
          </div>
        </div>

        <div className="space-y-6 lg:pt-8">
          {values.map((value, index) => (
            <article
              key={value.title}
              className="slide-frame bg-ink-soft/50 px-8 py-6"
            >
              <span className="slide-label text-[10px]">
                0{index + 1}
              </span>
              <h3 className="slide-heading text-xl mt-3 mb-3">
                {value.title}
              </h3>
              <p className="slide-body text-base">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
