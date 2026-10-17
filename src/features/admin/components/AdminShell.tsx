import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { clearLocalData } from '@/features/admin/localStore'
import { useAdminAuth } from '@/features/admin/session'

const links = [
  { to: '/admin', label: 'Resumen', end: true },
  { to: '/admin/contenido', label: 'Textos', end: false },
  { to: '/admin/galeria', label: 'Galería', end: false },
  { to: '/admin/equipo', label: 'Equipo', end: false },
  { to: '/admin/consultas', label: 'Consultas', end: false },
]

export function AdminShell() {
  const { mode, email, signOut } = useAdminAuth()
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-beige-50 font-label text-sm leading-normal text-ink">
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-ink px-4 text-cream md:hidden">
        <Link to="/admin" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <BrandLogo className="h-8 w-8 object-contain brightness-0 invert" />
          <span className="font-brand text-sm uppercase tracking-[0.16em]">Backoffice</span>
        </Link>
        <button
          type="button"
          className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-slide"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? 'Cerrar' : 'Menú'}
        </button>
      </header>

      {open && (
        <button
          type="button"
          aria-label="Cerrar menú"
          className="fixed inset-0 top-16 z-30 bg-ink/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`${open ? 'fixed flex top-16' : 'hidden'} inset-y-0 left-0 z-40 w-72 flex-col bg-ink text-cream md:fixed md:top-0 md:flex md:w-64`}
      >
        <div className="border-b border-white/10 px-6 py-7">
          <Link to="/" className="flex items-center gap-3">
            <BrandLogo className="h-10 w-10 object-contain brightness-0 invert" />
            <span>
              <span className="block font-brand text-sm uppercase tracking-[0.18em]">Gastromenu</span>
              <span className="mt-1 block font-label text-[10px] uppercase tracking-[0.28em] text-gold-slide">
                Backoffice
              </span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-6" aria-label="Secciones del backoffice">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block border-l-2 px-4 py-3 font-label text-[11px] uppercase tracking-[0.22em] transition-colors ${
                  isActive
                    ? 'border-gold-slide text-gold-slide'
                    : 'border-transparent text-cream-muted hover:text-cream'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="space-y-4 border-t border-white/10 px-6 py-6">
          <p className="font-serif text-sm font-light text-cream-muted">
            {mode === 'local' ? 'Copia local de este navegador' : email}
          </p>
          <div className="flex flex-col items-start gap-3">
            <Link
              to="/"
              className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-slide"
            >
              Ver la web
            </Link>
            {mode === 'remote' ? (
              <button
                type="button"
                onClick={() => void signOut()}
                className="font-label text-[10px] uppercase tracking-[0.2em] text-cream-muted"
              >
                Cerrar sesión
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  clearLocalData()
                  window.location.assign('/admin')
                }}
                className="font-label text-[10px] uppercase tracking-[0.2em] text-cream-muted"
              >
                Vaciar copia local
              </button>
            )}
          </div>
        </div>
      </aside>

      <div className="md:pl-64">
        {mode === 'local' && (
          <div className="border-b border-gold-slide/30 bg-gold-slide/10 px-4 py-3 md:px-10 mt-16 md:mt-0">
            <p className="font-serif text-sm font-light text-ink">
              Los cambios se ven en este navegador. Con Supabase conectado, el backoffice los guarda en la base de datos.
            </p>
          </div>
        )}
        <main className={`px-4 py-8 md:px-10 md:py-12 ${mode === 'remote' ? 'pt-24 md:pt-12' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
