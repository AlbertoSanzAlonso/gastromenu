import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { establishmentTypes, interestOptions } from '@/data/fallback'
import { useContactForm } from '@/features/contact/hooks/useContactForm'

const fieldClass =
  'w-full bg-ink-soft border border-gold-slide/25 px-5 py-4 text-cream font-serif font-light focus:border-gold-slide focus:outline-none transition-colors'

export function ContactForm() {
  const {
    form,
    updateField,
    toggleInterest,
    submit,
    submitting,
    success,
    error,
    resetSuccess,
  } = useContactForm()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    submit()
  }

  if (success) {
    return (
      <div className="text-center py-16">
        <p className="slide-heading text-2xl mb-4">
          Gracias por su confianza
        </p>
        <p className="slide-body max-w-md mx-auto mb-8">
          Hemos recibido su consulta. Nos pondremos en contacto con usted en el menor tiempo posible.
        </p>
        <Button variant="outlineDark" onClick={resetSuccess}>
          Enviar otra consulta
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10 max-w-3xl mx-auto slide-frame p-8 md:p-10 bg-ink-soft/40">
      {error && (
        <p className="text-red-300 text-sm font-label" role="alert">
          {error}
        </p>
      )}

      <fieldset className="space-y-6">
        <legend className="slide-label mb-6">
          Establecimiento
        </legend>

        <div>
          <label htmlFor="establishment" className="block slide-label text-[10px] !tracking-[0.2em] mb-2">
            Nombre y tipo de establecimiento *
          </label>
          <input
            id="establishment"
            required
            value={form.establishmentName}
            onChange={(e) => updateField('establishmentName', e.target.value)}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="type" className="block slide-label text-[10px] !tracking-[0.2em] mb-2">
            Tipo de establecimiento *
          </label>
          <select
            id="type"
            required
            value={form.establishmentType}
            onChange={(e) => updateField('establishmentType', e.target.value)}
            className={fieldClass}
          >
            <option value="">Seleccione una opción</option>
            {establishmentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="slide-label mb-6">
          Persona de contacto
        </legend>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block slide-label text-[10px] !tracking-[0.2em] mb-2">
              Nombre *
            </label>
            <input
              id="firstName"
              required
              value={form.firstName}
              onChange={(e) => updateField('firstName', e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block slide-label text-[10px] !tracking-[0.2em] mb-2">
              Apellidos *
            </label>
            <input
              id="lastName"
              required
              value={form.lastName}
              onChange={(e) => updateField('lastName', e.target.value)}
              className={fieldClass}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block slide-label text-[10px] !tracking-[0.2em] mb-2">
              Teléfono *
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={form.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="email" className="block slide-label text-[10px] !tracking-[0.2em] mb-2">
              Correo electrónico *
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
              className={fieldClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block slide-label text-[10px] !tracking-[0.2em] mb-2">
            Dirección, ciudad y provincia
          </label>
          <input
            id="address"
            value={form.address}
            onChange={(e) => updateField('address', e.target.value)}
            className={fieldClass}
          />
        </div>
      </fieldset>

      <fieldset>
        <legend className="slide-label mb-6">
          ¿En qué podemos ayudarle?
        </legend>
        <div className="space-y-4">
          {interestOptions.map((option) => (
            <label
              key={option}
              className="flex items-center gap-4 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={form.interests.includes(option)}
                onChange={() => toggleInterest(option)}
                className="h-4 w-4 accent-gold-slide"
              />
              <span className="slide-body text-sm group-hover:text-cream transition-colors">
                {option}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="block slide-label text-[10px] !tracking-[0.2em] mb-2">
          Mensaje adicional
        </label>
        <textarea
          id="message"
          rows={4}
          value={form.message}
          onChange={(e) => updateField('message', e.target.value)}
          className={`${fieldClass} resize-none`}
        />
      </div>

      <label className="flex items-start gap-4 cursor-pointer">
        <input
          type="checkbox"
          required
          checked={form.privacyAccepted}
          onChange={(e) => updateField('privacyAccepted', e.target.checked)}
          className="mt-1 h-4 w-4 accent-gold-slide"
        />
        <span className="slide-body text-sm">
          He leído y acepto la{' '}
          <Link
            to="/privacidad"
            className="text-gold-slide underline underline-offset-4 transition-colors hover:text-gold-highlight"
          >
            política de privacidad
          </Link>{' '}
          *
        </span>
      </label>

      <div className="text-center pt-4">
        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? 'Enviando…' : 'Enviar consulta'}
        </Button>
      </div>
    </form>
  )
}
