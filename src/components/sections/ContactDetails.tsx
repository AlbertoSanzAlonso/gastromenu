import { SocialLinks } from '@/components/ui/SocialLinks'
import { company } from '@/data/contact'

export function ContactDetails() {
  const [primary, secondary] = company.phones

  return (
    <div className="mb-16">
      <div className="grid border border-gold-slide/20 md:grid-cols-3">
        <article className="border-b border-gold-slide/20 p-8 md:border-r md:border-b-0">
          <p className="slide-label mb-5">{company.callLabel}</p>
          <a
            href={`tel:${primary.tel}`}
            className="block font-serif text-2xl text-cream transition-colors hover:text-gold-slide"
          >
            {primary.display}
          </a>
          <a
            href={`tel:${secondary.tel}`}
            className="mt-2 block font-serif text-lg text-cream-muted transition-colors hover:text-gold-slide"
          >
            {secondary.display}
          </a>
          <p className="mt-6 text-sm leading-relaxed text-cream-muted">{company.hours}</p>
        </article>

        <article className="border-b border-gold-slide/20 p-8 md:border-r md:border-b-0">
          <p className="slide-label mb-5">Escríbanos</p>
          <a
            href={`mailto:${company.email}`}
            className="block font-serif text-lg text-cream break-all transition-colors hover:text-gold-slide"
          >
            {company.email}
          </a>
          <p className="mt-6 text-sm leading-relaxed text-cream-muted">{company.callBody}</p>
        </article>

        <article className="p-8">
          <p className="slide-label mb-5">Dónde estamos</p>
          <p className="font-label text-[10px] uppercase tracking-[0.22em] text-cream-muted">
            {company.office.label}
          </p>
          <a
            href={company.office.maps}
            target="_blank"
            rel="noreferrer"
            className="mt-3 block font-serif text-base leading-snug text-cream transition-colors hover:text-gold-slide sm:text-lg"
          >
            <span className="block whitespace-nowrap">{company.office.street}</span>
            <span className="mt-1 block text-cream-muted">{company.office.city}</span>
          </a>
          <p className="mt-6 font-label text-[10px] uppercase tracking-[0.22em] text-cream-muted">
            {company.workshops.label}
          </p>
          <p className="mt-3 font-serif text-lg text-cream">
            {company.workshops.places.join(' · ')}
          </p>
        </article>
      </div>

      <div className="mt-8 flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="font-label text-[10px] uppercase tracking-[0.22em] text-gold-slide">
          <span className="block">{company.legalName}</span>
          <span className="mt-1 block tracking-[0.18em] text-cream-muted">CIF {company.cif}</span>
        </p>
        <SocialLinks className="justify-center" />
      </div>
    </div>
  )
}
