import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Container } from '@/components/ui/Container'

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/#galeria', label: 'Galería' },
  { to: '/#nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ink/90 backdrop-blur-md border-b border-beige-400/10">
      <Container as="div" className="flex items-center justify-between h-20 md:h-24">
        <Link
          to="/"
          className="font-display text-2xl md:text-3xl text-beige-100 tracking-wide hover:text-gold-light transition-colors"
          aria-label="GastroMenúPremium — Inicio"
        >
          Gastro<em className="gold-shimmer not-italic">Menú</em>Premium
        </Link>

        <nav className="hidden md:flex items-center gap-10" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-ui text-xs uppercase tracking-[0.25em] font-light transition-colors hover:text-gold-light ${
                  isActive ? 'text-gold' : 'text-beige-300'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span className={`block w-6 h-px bg-beige-100 transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-beige-100 transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-beige-100 transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </Container>

      {open && (
        <nav
          className="md:hidden bg-ink border-t border-beige-400/10 py-8"
          aria-label="Navegación móvil"
        >
          <Container>
            <ul className="space-y-6">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="font-ui text-sm uppercase tracking-[0.25em] text-beige-300 hover:text-gold-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      )}
    </header>
  )
}
