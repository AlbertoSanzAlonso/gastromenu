import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { Container } from '@/components/ui/Container'

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/#galeria', label: 'Galería' },
  { to: '/#nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

const SCROLL_THRESHOLD = 80

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerSurface = open
    ? 'bg-ink/78 backdrop-blur-md border-gold/10'
    : scrolled
      ? 'bg-ink/40 backdrop-blur-xl border-gold/10'
      : 'bg-ink/78 backdrop-blur-md border-gold/10'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ease-premium ${headerSurface}`}
    >
      <Container as="div" className="flex items-center justify-between h-20 md:h-24">
        <Link
          to="/"
          className="flex items-center gap-3 md:gap-4 group"
          aria-label="GastroMenu - Inicio"
        >
          <BrandLogo className="h-9 w-9 md:h-11 md:w-11 object-contain transition-transform duration-300 group-hover:scale-105" />
          <span className="brand-title text-base md:text-lg gold-shimmer transition-opacity group-hover:opacity-90">
            GASTROMENU
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-brand text-xs md:text-sm uppercase tracking-[0.3em] font-normal text-white transition-opacity duration-300 hover:opacity-80 ${
                  isActive ? 'opacity-100 font-medium' : 'opacity-90'
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
          <span className={`block w-6 h-px bg-white transition-all duration-300 group-hover:bg-white/80 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-white transition-all duration-300 group-hover:bg-white/80 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-white transition-all duration-300 group-hover:bg-white/80 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </Container>

      {open && (
        <nav
          className="md:hidden bg-ink/78 backdrop-blur-md border-t border-gold/10 py-8"
          aria-label="Navegación móvil"
        >
          <Container>
            <ul className="space-y-6">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="inline-block font-brand text-base uppercase tracking-[0.3em] font-normal text-white transition-opacity duration-300 hover:opacity-80"
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
