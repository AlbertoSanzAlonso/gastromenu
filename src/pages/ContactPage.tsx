import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { ContactForm } from '@/components/ui/ContactForm'
import { GoldText } from '@/components/ui/GoldText'
import { SEO } from '@/lib/seo/SEO'

export function ContactPage() {
  return (
    <>
      <SEO
        title="Contacto"
        description="Solicite presupuesto sin compromiso. GastroMenúPremium — cartas, manteles y portamenús de alta calidad para su establecimiento."
        path="/contacto"
      />
      <Section variant="dark" className="!pt-32">
        <Heading
          as="h1"
          subtitle="Sin compromiso, al mejor precio"
          align="center"
          className="mx-auto"
        >
          Hablemos de su <GoldText>proyecto</GoldText>
        </Heading>

        <p className="text-center text-beige-400 font-light max-w-2xl mx-auto mb-16 -mt-8 leading-relaxed">
          Envíenos sus preguntas y, en el menor tiempo posible, nos pondremos en
          contacto con usted para sugerirle la mejor solución.
        </p>

        <ContactForm />
      </Section>
    </>
  )
}
