import { ContactDetails } from '@/components/sections/ContactDetails'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { ContactForm } from '@/components/ui/ContactForm'
import { GoldText } from '@/components/ui/GoldText'
import { company } from '@/data/contact'
import { SEO } from '@/lib/seo/SEO'

export function ContactPage() {
  return (
    <>
      <SEO
        title="Contacto"
        description="Llámenos al 605 989 264 o escríbanos a info@cartasmenu.com. Oficina en Benalmádena Pueblo, Málaga. Talleres en Madrid, Málaga y Granada."
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

        <p className="text-center slide-body max-w-2xl mx-auto mb-16 -mt-8">
          {company.callLabel} al{' '}
          <a
            href={`tel:${company.phones[0].tel}`}
            className="text-gold-slide transition-colors hover:text-gold-highlight"
          >
            {company.phones[0].display}
          </a>
          , o escríbanos para indicarnos sus necesidades. Nos pondremos en contacto lo antes posible.
        </p>

        <ContactDetails />
        <ContactForm />
      </Section>
    </>
  )
}
