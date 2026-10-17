import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Heading'
import { GoldText } from '@/components/ui/GoldText'
import { ABOUT_SECTION_WATERMARK_SRC } from '@/data/brand'

const values = [
  {
    title: 'Premium',
    description:
      'Piel, semipiel, tejidos nobles, maderas selectas, tapas rígidas y acero, elegidos para durar.',
  },
  {
    title: 'Exquisitez',
    description:
      'Diseños personalizados y acabados —troquel, stamping, reserva UVI— pensados carta a carta.',
  },
  {
    title: 'Compromiso',
    description:
      '28 años interpretando cada proyecto para que la imagen del local empiece en la mesa.',
  },
]

export function AboutSection() {
  return (
    <section
      id="nosotros"
      aria-label="Sobre nosotros"
      className="section-padding relative overflow-hidden bg-ink text-cream [&_.slide-heading]:text-cream [&_.slide-body]:text-cream-muted"
    >
      <div
        aria-hidden
        className="about-section__visual"
        style={{ backgroundImage: `url(${ABOUT_SECTION_WATERMARK_SRC})` }}
      />
      <div aria-hidden className="section-watermark-overlay section-watermark-overlay--about" />

      <Container className="relative z-[2]">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <Heading as="h2" subtitle="28 años de experiencia">
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
                Llevamos 28 años diseñando y fabricando cartas de menú, manteles
                personalizados y atriles portamenú para restaurantes que entienden
                que cada detalle cuenta.
              </p>
              <p>
                Combinamos la artesanía tradicional con la innovación del sector premium:
                diseños personalizados, materiales nobles y un marketing gastronómico
                que interpreta sus deseos.
              </p>
            </div>
          </div>

          <div className="space-y-6 lg:pt-8">
            {values.map((value, index) => (
              <article
                key={value.title}
                className="slide-frame bg-ink-soft/35 px-8 py-6"
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
      </Container>
    </section>
  )
}
