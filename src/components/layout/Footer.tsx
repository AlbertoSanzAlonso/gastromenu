import { Link } from 'react-router-dom'
import { BrandDivider } from '@/components/ui/BrandDivider'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { Container } from '@/components/ui/Container'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { FOOTER_WATERMARK_SRC } from '@/data/brand'
import { company } from '@/data/contact'
import { useMessages } from '@/i18n/useMessages'

export function Footer() {
  const year = new Date().getFullYear()
  const [primary, secondary] = company.phones
  const { m } = useMessages()

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
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <BrandLogo
            variant="lockup"
            className="mb-4 h-28 w-auto max-w-[16rem] object-contain opacity-95 md:h-32"
          />
          <BrandDivider className="mb-4" />
          <p className="slide-body text-sm leading-relaxed">{m.footer.tagline}</p>
          <SocialLinks compact className="mt-8 justify-center" />
        </div>

        <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-8">
          <div className="md:text-left">
            <p className="slide-label text-[10px] mb-6">{m.footer.navigation}</p>
            <ul className="space-y-3">
              {m.nav.links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="slide-body text-sm !text-left hover:text-gold-slide transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="slide-label text-[10px] mb-6">{m.footer.commitment}</p>
            <p className="slide-body text-sm leading-relaxed max-w-xs">
              {m.footer.commitmentBody}
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-2xl flex-col items-center gap-3 text-center">
          <p className="font-serif text-lg font-light tracking-wide text-cream md:text-xl">
            <a href={`tel:${primary.tel}`} className="transition-colors hover:text-gold-slide">
              {primary.display}
            </a>
            <span className="mx-3 text-gold-slide/40" aria-hidden>
              ·
            </span>
            <a href={`tel:${secondary.tel}`} className="transition-colors hover:text-gold-slide">
              {secondary.display}
            </a>
          </p>
          <a
            href={`mailto:${company.email}`}
            className="slide-body text-sm transition-colors hover:text-gold-slide"
          >
            {company.email}
          </a>
          <p className="slide-label text-[10px]">
            {m.footer.workshops} {company.workshops.places.join(', ')}
          </p>
          <p className="slide-label text-[10px]">{m.contact.hours}</p>
        </div>

        <p className="mt-12 slide-accent text-xl md:text-2xl text-center">
          {m.footer.motto}
        </p>

        <BrandDivider className="my-12" />

        <p className="slide-label mb-8 text-center text-[10px]">
          {company.legalName}
          <span className="mx-3 text-gold-slide/40">·</span>
          CIF {company.cif}
        </p>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="slide-label text-[10px]">© {year} GastroMenú Premium. {m.footer.rights}</p>
          <p className="slide-label text-[10px]">
            <Link to="/aviso-legal" className="transition-colors hover:text-gold-highlight">
              {m.footer.legal}
            </Link>
            <span className="mx-2 text-gold-slide/40">·</span>
            <Link to="/privacidad" className="transition-colors hover:text-gold-highlight">
              {m.footer.privacy}
            </Link>
            <span className="mx-2 text-gold-slide/40">·</span>
            <Link to="/condiciones-de-venta" className="transition-colors hover:text-gold-highlight">
              {m.footer.terms}
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  )
}
