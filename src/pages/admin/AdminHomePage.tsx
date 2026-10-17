import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AdminHeader, ErrorNote, LoadingNote } from '@/features/admin/components/AdminControls'
import { errorMessage } from '@/features/admin/errors'
import { formatDate } from '@/features/admin/format'
import type { InquiryRecord } from '@/features/admin/localStore'
import { useAdminAuth } from '@/features/admin/session'

interface Summary {
  texts: number
  items: number
  team: number
  inquiries: InquiryRecord[]
}

export function AdminHomePage() {
  const { repo } = useAdminAuth()
  const [summary, setSummary] = useState<Summary | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function load() {
      try {
        const [content, items, team, inquiries] = await Promise.all([
          repo.listContent(),
          repo.listItems(),
          repo.listTeam(),
          repo.listInquiries(),
        ])
        if (!active) return
        setSummary({
          texts: content.length,
          items: items.length,
          team: team.length,
          inquiries,
        })
        setError(null)
      } catch (err) {
        if (active) setError(errorMessage(err))
      }
    }

    void load()
    return () => {
      active = false
    }
  }, [repo])

  const cards = [
    { to: '/admin/contenido', label: 'Textos', value: summary?.texts ?? 0, detail: 'Portada' },
    { to: '/admin/galeria', label: 'Piezas', value: summary?.items ?? 0, detail: 'Galería' },
    { to: '/admin/equipo', label: 'Equipo', value: summary?.team ?? 0, detail: 'Portada' },
    {
      to: '/admin/consultas',
      label: 'Consultas',
      value: summary?.inquiries.length ?? 0,
      detail: 'Formulario',
    },
  ]

  return (
    <div className="mx-auto max-w-6xl">
      <AdminHeader
        eyebrow="Resumen"
        title="El contenido del sitio"
        description="Cambia los textos de la portada, las imágenes de la galería, el equipo y revisa las consultas que llegan del formulario."
      />

      {error && <ErrorNote message={error} onRetry={() => window.location.reload()} />}
      {!summary && !error && <LoadingNote label="Cargando resumen" />}

      {summary && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
              <Link
                key={card.to}
                to={card.to}
                className="border border-beige-300 bg-white px-6 py-6 transition-colors hover:border-gold-slide"
              >
                <p className="font-label text-[10px] uppercase tracking-[0.22em] text-gold-slide">
                  {card.detail}
                </p>
                <p className="mt-4 font-serif text-5xl font-light">{card.value}</p>
                <p className="mt-3 font-label text-[11px] uppercase tracking-[0.18em]">{card.label}</p>
              </Link>
            ))}
          </div>

          <section className="mt-12">
            <div className="mb-5 flex items-end justify-between gap-4">
              <h2 className="font-serif text-3xl font-light">Consultas recientes</h2>
              <Link
                to="/admin/consultas"
                className="font-label text-[10px] uppercase tracking-[0.18em] text-gold-dark"
              >
                Ver todas
              </Link>
            </div>
            {summary.inquiries.length === 0 ? (
              <p className="border border-dashed border-beige-400 bg-white px-6 py-10 text-center font-serif font-light text-slate">
                Todavía no hay consultas.
              </p>
            ) : (
              <ul className="divide-y divide-beige-300 border border-beige-300 bg-white">
                {summary.inquiries.slice(0, 4).map((inquiry) => (
                  <li key={inquiry.id}>
                    <Link
                      to={`/admin/consultas?id=${inquiry.id}`}
                      className="flex flex-col gap-1 px-5 py-4 transition-colors hover:bg-beige-100 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <span>
                        <span className="block font-serif text-lg font-light">
                          {inquiry.establishment_name}
                        </span>
                        <span className="font-serif text-sm font-light text-slate">
                          {inquiry.contact_first_name} {inquiry.contact_last_name}
                        </span>
                      </span>
                      <span className="font-label text-[10px] uppercase tracking-[0.16em] text-stone">
                        {formatDate(inquiry.created_at)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  )
}
