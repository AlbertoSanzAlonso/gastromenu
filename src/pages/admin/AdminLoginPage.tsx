import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { AdminButton, TextInput } from '@/features/admin/components/AdminControls'
import { useAdminAuth } from '@/features/admin/session'

export function AdminLoginPage() {
  const { signIn } = useAdminAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    const message = await signIn(email, password)
    if (message) setError(message)
    setSubmitting(false)
  }

  return (
    <main className="grid min-h-screen place-items-center bg-ink px-4 py-16 text-ink">
      <div className="w-full max-w-md border border-gold-slide/30 bg-beige-50 px-8 py-10 md:px-10">
        <div className="mb-8 flex items-center gap-4">
          <BrandLogo className="h-12 w-12 object-contain" />
          <div>
            <p className="font-brand text-sm uppercase tracking-[0.18em]">Gastromenu</p>
            <p className="mt-1 font-label text-[10px] uppercase tracking-[0.28em] text-gold-slide">
              Backoffice
            </p>
          </div>
        </div>

        <h1 className="font-serif text-4xl font-light">Acceso</h1>
        <p className="mt-3 font-serif text-base font-light text-slate">
          Entra con el usuario creado en Supabase Authentication.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error && (
            <p role="alert" className="font-serif text-sm font-light text-red-800">
              {error}
            </p>
          )}
          <label className="block">
            <span className="mb-2 block font-label text-[10px] uppercase tracking-[0.2em] text-stone">
              Correo
            </span>
            <TextInput
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label className="block">
            <span className="mb-2 block font-label text-[10px] uppercase tracking-[0.2em] text-stone">
              Contraseña
            </span>
            <TextInput
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <AdminButton type="submit" tone="gold" disabled={submitting} className="w-full">
            {submitting ? 'Entrando' : 'Entrar'}
          </AdminButton>
        </form>

        <Link
          to="/"
          className="mt-8 inline-block font-label text-[10px] uppercase tracking-[0.2em] text-stone"
        >
          Volver a la web
        </Link>
      </div>
    </main>
  )
}
