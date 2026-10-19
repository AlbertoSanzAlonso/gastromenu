import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { Container } from '@/components/ui/Container'
import { mainNav } from '@/data/navigation'

const SCROLL_THRESHOLD = 80

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return

    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKey)
    }
  }, [open])

  const headerSurface = scrolled ? 'bg-ink/95 border-gold/15' : 'bg-ink border-gold/10'
  const logoColor = scrolled ? 'text-white' : 'text-gold-slide'

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md transition-colors duration-500 ease-premium ${headerSurface}`}
    >
      <Container as="div" className="relative flex h-20 items-center md:h-24">
        <Link
          to="/"
          className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 group sm:gap-3 md:gap-4"
          aria-label="GastroMenu - Inicio"
          onClick={() => setOpen(false)}
        >
          <BrandLogo
            className={`h-8 w-8 object-contain transition-all duration-500 ease-premium group-hover:scale-105 sm:h-9 sm:w-9 md:h-11 md:w-11 ${
              scrolled ? 'brightness-0 invert' : ''
            }`}
          />
          <span
            className={`brand-title text-sm transition-all duration-500 ease-premium group-hover:opacity-80 sm:text-base md:text-lg ${logoColor}`}
          >
            GASTROMENU
          </span>
        </Link>
      </Container>
    </header>

      <button
        type="button"
        className={`nav-toggle fixed top-5 right-5 z-[70] cursor-pointer p-2.5 transition-colors duration-500 ease-premium hover:opacity-80 sm:right-8 md:top-7 md:right-10 ${open ? 'text-ink' : logoColor}`}
        data-open={open ? 'true' : 'false'}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
      >
        <span className="nav-toggle__bars" aria-hidden>
          <span className="nav-toggle__bar nav-toggle__bar--top">
            <span />
          </span>
          <span className="nav-toggle__bar nav-toggle__bar--mid" />
          <span className="nav-toggle__bar nav-toggle__bar--bot">
            <span />
          </span>
        </span>
      </button>

      <div className="site-drawer-root" data-open={open ? 'true' : 'false'} inert={open ? undefined : true}>
        <div className="site-drawer-backdrop" onClick={() => setOpen(false)} />
        <nav id="site-menu" className="site-drawer" aria-label="Navegación principal">
          <div className="site-drawer-head">
            <Link to="/" className="site-drawer-brand" onClick={() => setOpen(false)}>
              <BrandLogo className="h-10 w-10 object-contain md:h-12 md:w-12" />
              <span className="brand-title text-sm text-gold-dark md:text-base">GASTROMENU</span>
            </Link>
          </div>
          <ul>
            {mainNav.map((link, index) => (
              <li
                key={link.to}
                className="site-drawer-link"
                style={{ transitionDelay: open ? `${160 + index * 55}ms` : '0ms' }}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `site-drawer-anchor ${isActive ? 'is-active' : ''}`
                  }
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="site-drawer-foot">
            <Link to="/contacto" className="site-drawer-cta" onClick={() => setOpen(false)}>
              Contactar
            </Link>
            <p className="site-drawer-note">Porque la excelencia también se sirve en la mesa.</p>
          </div>
        </nav>
      </div>
    </>
  )
}
