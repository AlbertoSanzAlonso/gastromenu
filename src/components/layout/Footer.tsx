import { Link } from 'react-router-dom'
import { BrandDivider } from '@/components/ui/BrandDivider'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { Container } from '@/components/ui/Container'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { FOOTER_WATERMARK_SRC } from '@/data/brand'
import { company } from '@/data/contact'
import { mainNav } from '@/data/navigation'

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
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <BrandLogo className="h-12 w-12 md:h-14 md:w-14 object-contain opacity-90" />
              <p className="brand-title text-sm text-gold-slide">GASTROMENU</p>
            </div>
            <BrandDivider className="!mx-0 !max-w-[8rem] mb-4" />
            <p className="slide-body text-sm !text-left leading-relaxed max-w-xs">
              Cartas artesanales premium para el alma de tu negocio.
            </p>
            <SocialLinks compact className="mt-8" />
          </div>

          <div>
            <p className="slide-label text-[10px] mb-6">Navegación</p>
            <ul className="space-y-3">
              {mainNav.map((link) => (
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
            <p className="slide-label text-[10px] mb-6">Compromiso</p>
            <p className="slide-body text-sm leading-relaxed max-w-xs">
              Materiales de primerísima calidad, diseños adaptados y un equipo artesanal
              que interpreta cada proyecto con exquisitez y dedicación.
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
          <a
            href={company.office.maps}
            target="_blank"
            rel="noreferrer"
            className="font-serif text-sm font-light leading-relaxed text-cream-muted transition-colors hover:text-gold-slide"
          >
            {company.office.street}
            <span className="mt-1 block">{company.office.city}</span>
          </a>
          <p className="slide-label text-[10px]">
            Talleres en {company.workshops.places.join(', ')}
          </p>
          <p className="slide-label text-[10px]">{company.hours}</p>
        </div>

        <p className="mt-12 slide-accent text-xl md:text-2xl text-center">
          Porque la excelencia también se sirve en la mesa.
        </p>

        <BrandDivider className="my-12" />

        <p className="slide-label mb-8 text-center text-[10px]">
          {company.legalName}
          <span className="mx-3 text-gold-slide/40">·</span>
          CIF {company.cif}
        </p>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="slide-label text-[10px]">© {year} GastroMenu. Todos los derechos reservados.</p>
          <p className="slide-label text-[10px]">
            <Link to="/aviso-legal" className="transition-colors hover:text-gold-highlight">
              Aviso legal
            </Link>
            <span className="mx-2 text-gold-slide/40">·</span>
            <Link to="/privacidad" className="transition-colors hover:text-gold-highlight">
              Política de privacidad
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  )
}
