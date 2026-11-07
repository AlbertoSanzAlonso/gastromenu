import { useState } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client'
import type { ContactInquiry } from '@/lib/supabase/types'
import { useMessages } from '@/i18n/useMessages'

interface ContactFormState {
  establishmentName: string
  establishmentType: string
  firstName: string
  lastName: string
  phone: string
  address: string
  email: string
  interests: string[]
  message: string
  privacyAccepted: boolean
  companyWebsite: string
}

const initialState: ContactFormState = {
  establishmentName: '',
  establishmentType: '',
  firstName: '',
  lastName: '',
  phone: '',
  address: '',
  email: '',
  interests: [],
  message: '',
  privacyAccepted: false,
  companyWebsite: '',
}

export function useContactForm() {
  const { m } = useMessages()
  const [form, setForm] = useState<ContactFormState>(initialState)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function updateField<K extends keyof ContactFormState>(
    field: K,
    value: ContactFormState[K],
  ) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function toggleInterest(interest: string) {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  async function submit() {
    setSubmitting(true)
    setError(null)

    const payload: ContactInquiry = {
      establishment_name: form.establishmentName,
      establishment_type: form.establishmentType,
      contact_first_name: form.firstName,
      contact_last_name: form.lastName,
      phone: form.phone,
      address: form.address || null,
      email: form.email,
      interests: form.interests,
      message: form.message || null,
      privacy_accepted: form.privacyAccepted,
    }

    try {
      const response = await fetch(contactEndpoint(), {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          establishmentName: form.establishmentName,
          establishmentType: form.establishmentType,
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          address: form.address,
          email: form.email,
          interests: form.interests,
          message: form.message,
          privacyAccepted: form.privacyAccepted,
          companyWebsite: form.companyWebsite,
        }),
      })

      if (!response.ok) {
        const code = await readErrorCode(response)
        throw new Error(code === 'invalid' ? m.form.errorInvalid : m.form.error)
      }

      if (isSupabaseConfigured && supabase) {
        const { error: dbError } = await supabase.from('contact_inquiries').insert(payload)
        if (dbError) console.error('La consulta se envió, pero no quedó guardada', dbError.message)
      }

      setSuccess(true)
      setForm(initialState)
    } catch (err) {
      setError(err instanceof Error ? err.message : m.form.error)
    } finally {
      setSubmitting(false)
    }
  }

  return {
    form,
    updateField,
    toggleInterest,
    submit,
    submitting,
    success,
    error,
    resetSuccess: () => setSuccess(false),
  }
}

function contactEndpoint() {
  const configured = import.meta.env.VITE_CONTENT_API?.trim()
  if (!configured) return '/api/contact'
  return `${configured.replace(/\/$/, '')}/api/contact`
}

async function readErrorCode(response: Response) {
  try {
    const data: unknown = await response.json()
    if (data && typeof data === 'object' && 'error' in data && data.error === 'invalid') {
      return 'invalid'
    }
  } catch {
    return 'send'
  }
  return 'send'
}
