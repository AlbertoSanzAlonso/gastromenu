import { ContactDetails } from '@/components/sections/ContactDetails'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { ContactForm } from '@/components/ui/ContactForm'
import { GoldText } from '@/components/ui/GoldText'
import { company } from '@/data/contact'
import { useMessages } from '@/i18n/useMessages'
import { SEO } from '@/lib/seo/SEO'

export function ContactPage() {
  const { m } = useMessages()

  return (
    <>
      <SEO
        title={m.seo.contactTitle}
        description={m.seo.contactDescription}
        path="/contacto"
      />
      <Section variant="dark" className="!pt-32">
        <Heading
          as="h1"
          subtitle={m.contact.subtitle}
          align="center"
          className="mx-auto"
        >
          {m.contact.titleBefore} <GoldText>{m.contact.titleAccent}</GoldText>
        </Heading>

        <p className="text-center slide-body max-w-2xl mx-auto mb-16 -mt-8">
          {m.contact.call}{' '}
          <a
            href={`tel:${company.phones[0].tel}`}
            className="text-gold-slide transition-colors hover:text-gold-highlight"
          >
            {company.phones[0].display}
          </a>
          {m.contact.introAfter}
        </p>

        <ContactDetails />
        <ContactForm />
      </Section>
    </>
  )
}
