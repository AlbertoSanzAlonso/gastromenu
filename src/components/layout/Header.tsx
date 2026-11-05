import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { Container } from '@/components/ui/Container'
import { LanguageSwitch } from '@/components/ui/LanguageSwitch'
import { useMessages } from '@/i18n/useMessages'

const SCROLL_THRESHOLD = 12

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { m } = useMessages()

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

  const logoColor = scrolled ? 'text-white' : 'text-gold-slide'

  return (
    <>
    <header
      className="site-header fixed top-0 left-0 right-0 z-50"
      data-scrolled={scrolled ? 'true' : 'false'}
    >
      <Container as="div" className="flex h-20 items-center justify-center md:h-24">
        <Link
          to="/"
          className="z-10 flex items-center gap-2 group sm:gap-3 md:gap-4"
          aria-label={m.nav.home}
          onClick={() => setOpen(false)}
        >
          <BrandLogo
            className={`h-8 w-8 object-contain sm:h-9 sm:w-9 md:h-11 md:w-11 ${
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

      <LanguageSwitch
        className={`fixed top-5 left-5 z-[70] p-2.5 transition-opacity duration-500 ease-premium md:top-7 md:left-10 ${
          open ? 'max-md:pointer-events-none max-md:opacity-0' : ''
        }`}
      />

      <button
        type="button"
        className={`nav-toggle fixed top-5 right-5 z-[70] cursor-pointer p-2.5 transition-colors duration-500 ease-premium hover:opacity-80 sm:right-8 md:top-7 md:right-10 ${open ? 'text-ink' : logoColor}`}
        data-open={open ? 'true' : 'false'}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? m.nav.close : m.nav.open}
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
        <nav id="site-menu" className="site-drawer" aria-label={m.nav.primary}>
          <div className="site-drawer-sheet">
            <div className="site-drawer-head">
              <Link to="/" className="site-drawer-brand" onClick={() => setOpen(false)}>
                <BrandLogo className="h-8 w-8 object-contain sm:h-9 sm:w-9 md:h-12 md:w-12" />
                <span className="brand-title text-sm text-gold-dark sm:text-base">GASTROMENU</span>
              </Link>
            </div>
            <ul>
              {m.nav.links.map((link, index) => (
                <li
                  key={link.to}
                  className="site-drawer-link"
                  style={{ transitionDelay: open ? `${520 + index * 48}ms` : '0ms' }}
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
                {m.nav.contact}
              </Link>
              <p className="site-drawer-note">{m.nav.note}</p>
            </div>
          </div>
          <div className="site-drawer-shade" aria-hidden />
        </nav>
      </div>
    </>
  )
}
