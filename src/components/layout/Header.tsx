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
          aria-label="GastroMenu - Inicio"
        >
          Gastro<em className="gold-shimmer not-italic">Menu</em>
        </Link>

        <nav className="hidden md:flex items-center gap-10" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative font-ui text-xs uppercase tracking-[0.25em] font-light transition-colors duration-300 after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gold/70 after:transition-transform after:duration-300 hover:text-gold-light hover:after:scale-x-100 ${
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
          className="group md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span className={`block w-6 h-px bg-beige-100 transition-all duration-300 group-hover:bg-gold-light ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-beige-100 transition-all duration-300 group-hover:bg-gold-light ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-beige-100 transition-all duration-300 group-hover:bg-gold-light ${open ? '-rotate-45 -translate-y-2' : ''}`} />
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
                    className="inline-block font-ui text-sm uppercase tracking-[0.25em] text-beige-300 transition-all duration-300 hover:translate-x-1 hover:text-gold-light"
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
