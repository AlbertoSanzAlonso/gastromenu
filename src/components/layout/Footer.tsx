import { Link } from 'react-router-dom'
import { BrandDivider } from '@/components/ui/BrandDivider'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { Container } from '@/components/ui/Container'
import { FOOTER_WATERMARK_SRC } from '@/data/brand'

export function Footer() {
  const year = new Date().getFullYear()

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
              <p className="brand-title text-sm text-gold-slide">
                GASTROMENU
              </p>
            </div>
            <BrandDivider className="!mx-0 !max-w-[8rem] mb-4" />
            <p className="slide-body text-sm !text-left leading-relaxed max-w-xs">
              Cartas artesanales premium para el alma de tu negocio.
            </p>
          </div>

          <div>
            <p className="slide-label text-[10px] mb-6">
              Navegación
            </p>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Inicio' },
                { to: '/#galeria', label: 'Galería' },
                { to: '/contacto', label: 'Contacto' },
              ].map((link) => (
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
            <p className="slide-label text-[10px] mb-6">
              Compromiso
            </p>
            <p className="slide-body text-sm leading-relaxed">
              Materiales de primerísima calidad, diseños adaptados y un equipo artesanal
              que interpreta cada proyecto con exquisitez y dedicación.
            </p>
          </div>
        </div>

        <p className="mt-8 slide-accent text-xl md:text-2xl text-center">
          Porque la excelencia también se sirve en la mesa.
        </p>

        <BrandDivider className="my-12" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="slide-label text-[10px]">
            © {year} GastroMenu. Todos los derechos reservados.
          </p>
          <p className="slide-label text-[10px]">
            Aviso legal · Política de privacidad
          </p>
        </div>
      </Container>
    </footer>
  )
}
