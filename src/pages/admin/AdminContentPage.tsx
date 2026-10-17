import { useCallback, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  AdminButton,
  AdminHeader,
  ErrorNote,
  Field,
  ImageField,
  LoadingNote,
  TextArea,
  TextInput,
} from '@/features/admin/components/AdminControls'
import { errorMessage } from '@/features/admin/errors'
import { useNotice } from '@/features/admin/notice'
import { useAdminAuth } from '@/features/admin/session'
import { useAdminList } from '@/features/admin/useAdminList'
import { contentFields, siteContentDefaults, type ContentField } from '@/features/content/catalog'
import { invalidateSiteContent } from '@/features/content/hooks/useSiteContent'
import type { SiteContent } from '@/lib/supabase/types'

export function AdminContentPage() {
  const { repo } = useAdminAuth()
  const { notify } = useNotice()
  const load = useCallback(() => repo.listContent(), [repo])
  const { data: rows, loading, error, reload } = useAdminList(load, [] as SiteContent[])
  const [newKey, setNewKey] = useState('')
  const [newValue, setNewValue] = useState('')
  const [adding, setAdding] = useState(false)

  const extras = rows.filter((row) => !contentFields.some((field) => field.key === row.key))

  async function save(key: string, value: string) {
    await repo.saveContent(key, value)
    invalidateSiteContent()
    notify('ok', 'Texto guardado.')
    await reload()
  }

  async function remove(id: string) {
    await repo.deleteContent(id)
    invalidateSiteContent()
    notify('ok', 'Texto eliminado.')
    await reload()
  }

  async function handleAdd(event: FormEvent) {
    event.preventDefault()
    const key = newKey.trim()
    if (!/^[a-z0-9_]+$/.test(key)) {
      notify('error', 'La clave solo puede llevar minúsculas, números y guion bajo.')
      return
    }
    if (rows.some((row) => row.key === key) || contentFields.some((field) => field.key === key)) {
      notify('error', 'Esa clave ya existe.')
      return
    }
    setAdding(true)
    try {
      await save(key, newValue)
      setNewKey('')
      setNewValue('')
    } catch (err) {
      notify('error', errorMessage(err))
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <AdminHeader
        eyebrow="Portada"
        title="Textos e imagen"
        description="Estos campos se ven en el inicio. El titular admite un salto de línea y el texto de nosotros separa párrafos con una línea en blanco."
        action={
          <Link
            to="/#nosotros"
            className="inline-flex items-center justify-center border border-beige-300 bg-white px-5 py-3 font-label text-[11px] uppercase tracking-[0.18em] text-ink hover:border-gold-slide"
          >
            Ver la portada
          </Link>
        }
      />

      {error && <ErrorNote message={error} onRetry={() => void reload()} />}
      {loading && rows.length === 0 ? (
        <LoadingNote label="Cargando textos" />
      ) : (
        <div className="space-y-6">
          {contentFields.map((field) => {
            const row = rows.find((item) => item.key === field.key)
            return (
              <ContentCard
                key={field.key}
                label={field.label}
                description={field.description}
                kind={field.kind}
                rows={field.rows}
                fallback={siteContentDefaults[field.key]}
                stored={row?.value ?? null}
                onSave={(value) => save(field.key, value)}
                onDelete={row ? () => remove(row.id) : undefined}
                onUpload={(file) => repo.uploadImage(file, 'contenido')}
              />
            )
          })}

          {extras.length > 0 && (
            <section className="space-y-6 pt-4">
              <h2 className="font-serif text-2xl font-light">Otras claves</h2>
              <p className="font-serif text-sm font-light text-slate">
                Están guardadas en la base de datos. La portada todavía no las muestra.
              </p>
              {extras.map((row) => (
                <ContentCard
                  key={row.id}
                  label={row.key}
                  description="Clave personalizada."
                  kind="text"
                  rows={4}
                  fallback=""
                  stored={row.value}
                  onSave={(value) => save(row.key, value)}
                  onDelete={() => remove(row.id)}
                  onUpload={(file) => repo.uploadImage(file, 'contenido')}
                />
              ))}
            </section>
          )}

          <form onSubmit={handleAdd} className="space-y-5 border border-beige-300 bg-white p-6 md:p-8">
            <h2 className="font-serif text-2xl font-light">Nueva clave</h2>
            <Field label="Clave" hint="Minúsculas, números y guion bajo. Por ejemplo, footer_nota.">
              <TextInput
                value={newKey}
                onChange={(event) => setNewKey(event.target.value)}
                placeholder="footer_nota"
                required
              />
            </Field>
            <Field label="Valor">
              <TextArea
                rows={4}
                value={newValue}
                onChange={(event) => setNewValue(event.target.value)}
              />
            </Field>
            <AdminButton type="submit" disabled={adding}>
              {adding ? 'Guardando' : 'Añadir clave'}
            </AdminButton>
          </form>
        </div>
      )}
    </div>
  )
}

function ContentCard({
  label,
  description,
  kind,
  rows = 4,
  fallback,
  stored,
  onSave,
  onDelete,
  onUpload,
}: {
  label: string
  description: string
  kind: ContentField['kind']
  rows?: number
  fallback: string
  stored: string | null
  onSave: (value: string) => Promise<void>
  onDelete?: () => Promise<void>
  onUpload: (file: File) => Promise<string>
}) {
  const baseline = stored ?? fallback
  const [draft, setDraft] = useState(baseline)
  const [saving, setSaving] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const { notify } = useNotice()
  const published = stored != null
  const dirty = draft !== baseline

  async function handleSave(event: FormEvent) {
    event.preventDefault()
    setSaving(true)
    try {
      await onSave(draft)
    } catch (err) {
      notify('error', errorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!onDelete) return
    if (!confirming) {
      setConfirming(true)
      return
    }
    setSaving(true)
    try {
      await onDelete()
    } catch (err) {
      notify('error', errorMessage(err))
    } finally {
      setSaving(false)
      setConfirming(false)
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-5 border border-beige-300 bg-white p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-light">{label}</h2>
          <p className="mt-2 font-serif text-sm font-light text-slate">{description}</p>
        </div>
        <span className="shrink-0 font-label text-[10px] uppercase tracking-[0.16em] text-gold-dark">
          {published ? 'Publicado' : 'Borrador'}
        </span>
      </div>

      {kind === 'image' ? (
        <ImageField
          label="Archivo"
          value={draft}
          onChange={setDraft}
          onUpload={onUpload}
        />
      ) : (
        <TextArea
          rows={rows}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
      )}

      <div className="flex flex-wrap gap-3">
        <AdminButton type="submit" disabled={saving || (published && !dirty)}>
          {saving ? 'Guardando' : !published ? 'Publicar' : dirty ? 'Guardar cambios' : 'Guardado'}
        </AdminButton>
        {onDelete && (
          <AdminButton tone="danger" onClick={() => void handleDelete()} disabled={saving}>
            {confirming ? 'Confirmar eliminación' : 'Quitar'}
          </AdminButton>
        )}
      </div>
    </form>
  )
}
