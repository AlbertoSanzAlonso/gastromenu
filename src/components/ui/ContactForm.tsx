import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { useContactForm } from '@/features/contact/hooks/useContactForm'
import { useMessages } from '@/i18n/useMessages'

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
  const { m } = useMessages()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    submit()
  }

  if (success) {
    return (
      <div className="text-center py-16">
        <p className="slide-heading text-2xl mb-4">
          {m.form.thanksTitle}
        </p>
        <p className="slide-body max-w-md mx-auto mb-8">
          {m.form.thanksBody}
        </p>
        <Button variant="outlineDark" onClick={resetSuccess}>
          {m.form.another}
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
          {m.form.establishment}
        </legend>

        <div>
          <label htmlFor="establishment" className="block slide-label text-[10px] !tracking-[0.2em] mb-2">
            {m.form.establishmentName}
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
            {m.form.establishmentType}
          </label>
          <select
            id="type"
            required
            value={form.establishmentType}
            onChange={(e) => updateField('establishmentType', e.target.value)}
            className={fieldClass}
          >
            <option value="">{m.form.select}</option>
            {m.form.types.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="slide-label mb-6">
          {m.form.person}
        </legend>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block slide-label text-[10px] !tracking-[0.2em] mb-2">
              {m.form.firstName}
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
              {m.form.lastName}
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
              {m.form.phone}
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
              {m.form.email}
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
            {m.form.address}
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
          {m.form.help}
        </legend>
        <div className="space-y-4">
          {m.form.interests.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-4 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={form.interests.includes(option.value)}
                onChange={() => toggleInterest(option.value)}
                className="h-4 w-4 accent-gold-slide"
              />
              <span className="slide-body text-sm group-hover:text-cream transition-colors">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="block slide-label text-[10px] !tracking-[0.2em] mb-2">
          {m.form.message}
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
          {m.form.privacyBefore}{' '}
          <Link
            to="/privacidad"
            className="text-gold-slide underline underline-offset-4 transition-colors hover:text-gold-highlight"
          >
            {m.form.privacyLink}
          </Link>{' '}
          *
        </span>
      </label>

      <div className="text-center pt-4">
        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? m.form.sending : m.form.submit}
        </Button>
      </div>
    </form>
  )
}
