import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { GoldText } from '@/components/ui/GoldText'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink-soft border-t border-beige-400/10 py-16 md:py-20">
      <Container>
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <p className="font-display text-2xl text-beige-100 mb-4">
              Gastro<GoldText>Menú</GoldText>Premium
            </p>
            <p className="text-beige-400 font-light text-sm leading-relaxed max-w-xs">
              Alta calidad en imagen gastronómica. Desde 1998 al servicio de la hostelería.
            </p>
          </div>

          <div>
            <p className="font-ui text-xs uppercase tracking-[0.25em] text-gold mb-6">
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
                    className="text-beige-400 text-sm font-light hover:text-gold-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-ui text-xs uppercase tracking-[0.25em] text-gold mb-6">
              Compromiso
            </p>
            <p className="text-beige-400 font-light text-sm leading-relaxed">
              Materiales de primerísima calidad, diseños adaptados y un equipo artesanal
              que interpreta cada proyecto con exquisitez y dedicación.
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-beige-400/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-mist text-xs font-ui tracking-wider">
            © {year} GastroMenúPremium. Todos los derechos reservados.
          </p>
          <p className="text-mist text-xs font-ui tracking-wider">
            Aviso legal · Política de privacidad
          </p>
        </div>
      </Container>
    </footer>
  )
}
