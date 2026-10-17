import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  AdminHeader,
  EmptyNote,
  ErrorNote,
  LoadingNote,
  TextInput,
} from '@/features/admin/components/AdminControls'
import { formatDate } from '@/features/admin/format'
import type { InquiryRecord } from '@/features/admin/localStore'
import { useAdminAuth } from '@/features/admin/session'
import { useAdminList } from '@/features/admin/useAdminList'

export function AdminInquiriesPage() {
  const { repo } = useAdminAuth()
  const load = useCallback(() => repo.listInquiries(), [repo])
  const { data, loading, error, reload } = useAdminList(load, [] as InquiryRecord[])
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const selectedId = params.get('id')

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return data
    return data.filter((inquiry) => {
      const haystack = [
        inquiry.establishment_name,
        inquiry.establishment_type,
        inquiry.contact_first_name,
        inquiry.contact_last_name,
        inquiry.email,
        inquiry.phone,
        inquiry.message ?? '',
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(needle)
    })
  }, [data, query])

  const selected = data.find((inquiry) => inquiry.id === selectedId) ?? null

  return (
    <div className="mx-auto max-w-6xl">
      <AdminHeader
        eyebrow="Formulario"
        title="Consultas"
        description="Mensajes recibidos desde la página de contacto. Desde aquí se leen; la respuesta se hace por correo o teléfono."
      />

      {error && <ErrorNote message={error} onRetry={() => void reload()} />}
      {loading && data.length === 0 ? (
        <LoadingNote label="Cargando consultas" />
      ) : data.length === 0 ? (
        <EmptyNote title="No hay consultas">Cuando alguien envíe el formulario, aparecerá aquí.</EmptyNote>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <TextInput
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nombre, local o correo"
              aria-label="Buscar consultas"
              className="mb-4"
            />
            {filtered.length === 0 ? (
              <EmptyNote title="Sin resultados">Prueba con otro nombre o correo.</EmptyNote>
            ) : (
              <ul className="divide-y divide-beige-300 border border-beige-300 bg-white">
                {filtered.map((inquiry) => {
                  const active = inquiry.id === selectedId
                  return (
                    <li key={inquiry.id}>
                      <button
                        type="button"
                        onClick={() => setParams({ id: inquiry.id })}
                        className={`w-full px-5 py-4 text-left transition-colors ${
                          active ? 'bg-gold-slide/10' : 'hover:bg-beige-100'
                        }`}
                      >
                        <span className="flex items-start justify-between gap-4">
                          <span className="font-serif text-lg font-light">{inquiry.establishment_name}</span>
                          <span className="shrink-0 font-label text-[10px] uppercase tracking-[0.14em] text-stone">
                            {formatDate(inquiry.created_at)}
                          </span>
                        </span>
                        <span className="mt-1 block font-serif text-sm font-light text-slate">
                          {inquiry.contact_first_name} {inquiry.contact_last_name} · {inquiry.establishment_type}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          <aside className="border border-beige-300 bg-white p-6 lg:sticky lg:top-8 lg:self-start">
            {selected ? <InquiryDetail inquiry={selected} /> : (
              <p className="font-serif text-base font-light text-slate">
                Elige una consulta para ver el mensaje completo.
              </p>
            )}
          </aside>
        </div>
      )}
    </div>
  )
}

function InquiryDetail({ inquiry }: { inquiry: InquiryRecord }) {
  const rows = [
    ['Local', inquiry.establishment_name],
    ['Tipo', inquiry.establishment_type],
    ['Contacto', `${inquiry.contact_first_name} ${inquiry.contact_last_name}`],
    ['Teléfono', inquiry.phone],
    ['Correo', inquiry.email],
    ['Dirección', inquiry.address || 'Sin dirección'],
    ['Intereses', inquiry.interests.length ? inquiry.interests.join(', ') : 'Sin intereses'],
    ['Privacidad', inquiry.privacy_accepted ? 'Aceptada' : 'No aceptada'],
    ['Fecha', formatDate(inquiry.created_at)],
  ]

  return (
    <div>
      <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-dark">Consulta</p>
      <h2 className="mt-3 font-serif text-3xl font-light">{inquiry.establishment_name}</h2>
      <dl className="mt-6 space-y-4">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="font-label text-[10px] uppercase tracking-[0.16em] text-stone">{label}</dt>
            <dd className="mt-1 font-serif text-base font-light">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 border-t border-beige-300 pt-5">
        <p className="font-label text-[10px] uppercase tracking-[0.16em] text-stone">Mensaje</p>
        <p className="mt-2 whitespace-pre-wrap font-serif text-base font-light">
          {inquiry.message?.trim() || 'Sin mensaje.'}
        </p>
      </div>
      <a
        href={`mailto:${inquiry.email}`}
        className="mt-6 inline-block font-label text-[11px] uppercase tracking-[0.18em] text-gold-dark"
      >
        Responder por correo
      </a>
    </div>
  )
}
