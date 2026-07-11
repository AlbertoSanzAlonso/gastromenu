import { Link } from 'react-router-dom'
import { BrandDivider } from '@/components/ui/BrandDivider'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { Container } from '@/components/ui/Container'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 bg-ink/78 backdrop-blur-md border-t border-gold/10 py-16 md:py-20">
      <Container>
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <BrandLogo className="h-12 w-12 md:h-14 md:w-14 object-contain opacity-90" />
              <p className="brand-title text-sm gold-shimmer">
                GASTROMENU
              </p>
            </div>
            <BrandDivider className="!mx-0 !max-w-[8rem] mb-4" />
            <p className="brand-caption !text-left !tracking-[0.2em] leading-relaxed max-w-xs">
              Cartas artesanales premium para el alma de tu negocio.
            </p>
          </div>

          <div>
            <p className="brand-eyebrow text-[10px] mb-6">
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
                    className="brand-caption !text-left !tracking-[0.2em] hover:text-gold-text transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="brand-eyebrow text-[10px] mb-6">
              Compromiso
            </p>
            <p className="text-cream-muted font-brand font-normal text-sm leading-relaxed tracking-wide">
              Materiales de primerísima calidad, diseños adaptados y un equipo artesanal
              que interpreta cada proyecto con exquisitez y dedicación.
            </p>
          </div>
        </div>

        <BrandDivider className="my-12" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="brand-caption">
            © {year} GastroMenu. Todos los derechos reservados.
          </p>
          <p className="brand-caption">
            Aviso legal · Política de privacidad
          </p>
        </div>
      </Container>
    </footer>
  )
}
