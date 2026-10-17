import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { Container } from '@/components/ui/Container'
import { mainNav } from '@/data/navigation'

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
    ? 'bg-ink border-gold/10'
    : scrolled
      ? 'bg-ink/90 border-gold/10'
      : 'bg-ink border-gold/10'

  const headerTextColor = scrolled ? 'text-white' : 'text-gold-slide'
  const headerLineColor = scrolled ? 'bg-white' : 'bg-gold-slide'

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
          <BrandLogo
            className={`h-9 w-9 md:h-11 md:w-11 object-contain transition-all duration-500 ease-premium group-hover:scale-105 ${
              scrolled ? 'brightness-0 invert' : ''
            }`}
          />
          <span
            className={`brand-title text-base md:text-lg transition-all duration-500 ease-premium group-hover:opacity-80 ${headerTextColor}`}
          >
            GASTROMENU
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-5 2xl:gap-7" aria-label="Navegación principal">
          {mainNav.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-brand text-[11px] 2xl:text-xs uppercase tracking-[0.16em] 2xl:tracking-[0.22em] font-normal whitespace-nowrap transition-all duration-500 ease-premium hover:opacity-80 ${headerTextColor} ${
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
          className="group xl:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span className={`block w-6 h-px transition-all duration-500 ease-premium group-hover:opacity-80 ${headerLineColor} ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px transition-all duration-500 ease-premium group-hover:opacity-80 ${headerLineColor} ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px transition-all duration-500 ease-premium group-hover:opacity-80 ${headerLineColor} ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </Container>

      {open && (
        <nav
          className="xl:hidden bg-ink border-t border-gold/10 py-8"
          aria-label="Navegación móvil"
        >
          <Container>
            <ul className="space-y-6">
              {mainNav.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={`inline-block font-brand text-base uppercase tracking-[0.3em] font-normal transition-all duration-500 ease-premium hover:opacity-80 ${headerTextColor}`}
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
