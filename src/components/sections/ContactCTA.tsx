import { Link } from 'react-router-dom'
import { BrandDivider } from '@/components/ui/BrandDivider'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { GoldText } from '@/components/ui/GoldText'

export function ContactCTA() {
  return (
    <Section variant="beige" ariaLabel="Llamada a la acción">
      <div className="text-center max-w-3xl mx-auto">
        <BrandDivider className="mb-8" />
        <p className="slide-label mb-8">
          Sin compromiso
        </p>
        <h2 className="slide-heading text-3xl md:text-4xl mb-8 text-balance">
          ¿Listo para elevar la experiencia de sus <GoldText>comensales</GoldText>?
        </h2>
        <p className="slide-body mb-12 max-w-2xl mx-auto">
          Envíenos sus preguntas y, en el menor tiempo posible, nos pondremos en
          contacto para sugerirle la mejor solución —siempre con materiales de
          primerísima calidad.
        </p>
        <Link to="/contacto" className="inline-block cursor-pointer group">
          <Button size="lg" variant="primary" className="group-hover:tracking-[0.3em]">
            Contactar ahora
          </Button>
        </Link>
        <p className="mt-12 slide-accent text-2xl md:text-3xl">
          Porque la excelencia también se sirve en la mesa.
        </p>
      </div>
    </Section>
  )
}
