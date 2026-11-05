import { Link } from 'react-router-dom'
import { BrandDivider } from '@/components/ui/BrandDivider'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { GoldText } from '@/components/ui/GoldText'
import { company } from '@/data/contact'
import { useMessages } from '@/i18n/useMessages'

export function ContactCTA({ fadeTop = false }: { fadeTop?: boolean }) {
  const { m } = useMessages()

  return (
    <Section variant="beige" ariaLabel={m.home.ctaLabel} edgeFade={fadeTop ? 'top' : undefined}>
      <div className="text-center max-w-3xl mx-auto">
        <BrandDivider className="mb-8" />
        <p className="slide-label mb-8">
          {m.home.ctaKicker}
        </p>
        <h2 className="slide-heading text-3xl md:text-4xl mb-8 text-balance">
          {m.home.ctaTitleBefore} <GoldText>{m.home.ctaTitleAccent}</GoldText>?
        </h2>
        <p className="slide-body mb-12 max-w-2xl mx-auto">
          {m.home.ctaBody}
        </p>
        <Link to="/contacto" className="inline-block cursor-pointer group">
          <Button size="lg" variant="primary" className="group-hover:tracking-[0.3em]">
            {m.home.ctaButton}
          </Button>
        </Link>
        <p className="mt-8 slide-body">
          {m.contact.call}:{' '}
          <a
            href={`tel:${company.phones[0].tel}`}
            className="text-gold-dark transition-colors hover:text-gold-slide"
          >
            {company.phones[0].display}
          </a>
        </p>
        <p className="mt-12 slide-accent text-2xl md:text-3xl">
          {m.footer.motto}
        </p>
      </div>
    </Section>
  )
}
