import { Link } from 'react-router-dom'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { GoldText } from '@/components/ui/GoldText'

export function ContactCTA() {
  return (
    <Section variant="beige" ariaLabel="Llamada a la acción">
      <div className="text-center max-w-3xl mx-auto">
        <p className="brand-eyebrow text-[10px] mb-8">
          Sin compromiso
        </p>
        <h2 className="font-brand text-3xl md:text-4xl font-semibold uppercase tracking-[0.08em] text-ink mb-8 text-balance">
          ¿Listo para elevar la experiencia de sus <GoldText>comensales</GoldText>?
        </h2>
        <p className="text-stone font-light leading-relaxed mb-12 max-w-2xl mx-auto">
          Envíenos sus preguntas y, en el menor tiempo posible, nos pondremos en
          contacto para sugerirle la mejor solución —siempre con materiales de
          primerísima calidad.
        </p>
        <Link to="/contacto">
          <Button size="lg">Contactar ahora</Button>
        </Link>
      </div>
    </Section>
  )
}
