import { useState } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client'
import type { ContactInquiry } from '@/lib/supabase/types'

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
}

export function useContactForm() {
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
      if (isSupabaseConfigured && supabase) {
        const { error: dbError } = await supabase
          .from('contact_inquiries')
          .insert(payload)

        if (dbError) throw dbError
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800))
        console.info('Consulta (modo demo):', payload)
      }

      setSuccess(true)
      setForm(initialState)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo enviar la consulta')
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
