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

          <div className="space-y-6 text-beige-300 font-light leading-relaxed max-w-xl">
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
            <p className="font-display text-xl text-beige-100 italic">
              Confíe en <GoldText>GastroMenúPremium</GoldText>.
            </p>
          </div>
        </div>

        <div className="space-y-8 lg:pt-8">
          {values.map((value, index) => (
            <article
              key={value.title}
              className="border-l border-gold/30 pl-8 py-2"
            >
              <span className="font-ui text-[10px] uppercase tracking-[0.3em] text-gold-muted">
                0{index + 1}
              </span>
              <h3 className="font-display text-2xl text-beige-100 mt-2 mb-3">
                {value.title}
              </h3>
              <p className="text-beige-400 font-light text-base leading-relaxed">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
