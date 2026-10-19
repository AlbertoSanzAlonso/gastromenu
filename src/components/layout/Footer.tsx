import { Link } from 'react-router-dom'
import { BrandDivider } from '@/components/ui/BrandDivider'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { Container } from '@/components/ui/Container'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { FOOTER_WATERMARK_SRC } from '@/data/brand'
import { company, footerNav } from '@/data/contact'

export function Footer() {
  const year = new Date().getFullYear()
  const [primary, secondary] = company.phones

  return (
    <footer className="relative z-10 overflow-hidden bg-ink border-t border-gold/10 py-16 md:py-20 text-cream [&_.slide-body]:text-cream-muted">
      <img
        src={FOOTER_WATERMARK_SRC}
        alt=""
        aria-hidden
        decoding="async"
        className="section-watermark section-watermark--footer"
      />
      <div aria-hidden className="section-watermark-overlay section-watermark-overlay--footer" />

      <Container className="relative z-[2]">
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-10">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <BrandLogo className="h-12 w-12 object-contain opacity-90 md:h-14 md:w-14" />
              <p className="brand-title text-sm text-gold-slide">GASTROMENU</p>
            </div>
            <BrandDivider className="!mx-0 mb-6 !max-w-[8rem]" />
            <p className="slide-accent text-3xl">{company.callLabel}</p>
            <a
              href={`tel:${primary.tel}`}
              className="mt-2 block font-serif text-2xl text-cream transition-colors hover:text-gold-slide"
            >
              {primary.display}
            </a>
            <a
              href={`tel:${secondary.tel}`}
              className="mt-1 block font-serif text-base text-cream-muted transition-colors hover:text-gold-slide"
            >
              {secondary.display}
            </a>
            <p className="slide-body mt-5 max-w-xs text-sm leading-relaxed !text-left">
              {company.callBody}
            </p>
            <SocialLinks className="mt-8" />
          </div>

          <div>
            <p className="slide-label mb-6 text-[10px]">Contacto</p>
            <p className="font-label text-[10px] uppercase tracking-[0.22em] text-cream-muted">
              Email central
            </p>
            <a
              href={`mailto:${company.email}`}
              className="mt-2 block font-serif text-base text-cream transition-colors hover:text-gold-slide"
            >
              {company.email}
            </a>
            <p className="mt-8 font-label text-[10px] uppercase tracking-[0.22em] text-cream-muted">
              Horario
            </p>
            <p className="slide-body mt-2 text-sm leading-relaxed">{company.hours}</p>
          </div>

          <div>
            <p className="slide-label mb-6 text-[10px]">Dónde estamos</p>
            <p className="font-label text-[10px] uppercase tracking-[0.22em] text-cream-muted">
              {company.office.label}
            </p>
            <a
              href={company.office.maps}
              target="_blank"
              rel="noreferrer"
              className="mt-2 block font-serif text-base leading-snug text-cream transition-colors hover:text-gold-slide"
            >
              {company.office.street}
              <span className="mt-1 block text-cream-muted">{company.office.city}</span>
            </a>
            <p className="mt-8 font-label text-[10px] uppercase tracking-[0.22em] text-cream-muted">
              {company.workshops.label}
            </p>
            <p className="slide-body mt-2 text-sm">{company.workshops.places.join(' · ')}</p>
          </div>

          <div>
            <p className="slide-accent mb-6 text-2xl leading-tight">¿Se dejó algo sin ver?</p>
            <ul className="space-y-3">
              {footerNav.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="slide-body text-sm !text-left transition-colors hover:text-gold-slide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="slide-accent mt-14 text-center text-xl md:text-2xl">
          Porque la excelencia también se sirve en la mesa.
        </p>

        <BrandDivider className="my-12" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="slide-label text-[10px]">
            {company.legalName}
            <span className="mx-2 text-gold-slide/40">·</span>
            CIF {company.cif}
          </p>
          <p className="slide-label text-[10px]">© {year} GastroMenu. Todos los derechos reservados.</p>
          <p className="slide-label text-[10px]">Aviso legal · Política de privacidad</p>
        </div>
      </Container>
    </footer>
  )
}
