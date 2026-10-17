import { useCallback, useState, type FormEvent } from 'react'
import {
  AdminButton,
  AdminHeader,
  Drawer,
  EmptyNote,
  ErrorNote,
  Field,
  ImageField,
  LoadingNote,
  TextArea,
  TextInput,
} from '@/features/admin/components/AdminControls'
import { errorMessage } from '@/features/admin/errors'
import { useNotice } from '@/features/admin/notice'
import type { MemberDraft } from '@/features/admin/repository'
import { useAdminAuth } from '@/features/admin/session'
import { useAdminList } from '@/features/admin/useAdminList'
import type { TeamMember } from '@/lib/supabase/types'

export function AdminTeamPage() {
  const { repo } = useAdminAuth()
  const { notify } = useNotice()
  const load = useCallback(() => repo.listTeam(), [repo])
  const { data: members, loading, error, reload } = useAdminList(load, [] as TeamMember[])
  const [editing, setEditing] = useState<TeamMember | 'new' | null>(null)
  const [saving, setSaving] = useState(false)
  const nextOrder = members.reduce((max, member) => Math.max(max, member.sort_order), 0) + 1

  async function run(action: () => Promise<void>, message: string) {
    setSaving(true)
    try {
      await action()
      notify('ok', message)
      setEditing(null)
      await reload()
    } catch (err) {
      notify('error', errorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      <AdminHeader
        eyebrow="Portada"
        title="Equipo"
        description="Pasos que aparecen en el inicio. Si añades una imagen, se muestra sobre el texto."
        action={<AdminButton onClick={() => setEditing('new')}>Nuevo paso</AdminButton>}
      />

      {error && <ErrorNote message={error} onRetry={() => void reload()} />}
      {loading && members.length === 0 ? (
        <LoadingNote label="Cargando equipo" />
      ) : members.length === 0 ? (
        <EmptyNote title="El equipo está vacío">Añade el primer paso.</EmptyNote>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {members.map((member) => (
            <li key={member.id}>
              <button
                type="button"
                onClick={() => setEditing(member)}
                className="flex w-full gap-4 border border-beige-300 bg-white p-4 text-left transition-colors hover:border-gold-slide"
              >
                <div className="h-24 w-24 shrink-0 bg-ink">
                  {member.image_url ? (
                    <img src={member.image_url} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="grid h-full place-items-center font-serif text-2xl font-light text-gold-slide">
                      {String(member.sort_order).padStart(2, '0')}
                    </div>
                  )}
                </div>
                <span>
                  <span className="block font-label text-[10px] uppercase tracking-[0.18em] text-gold-dark">
                    Paso {String(member.sort_order).padStart(2, '0')}
                  </span>
                  <span className="mt-2 block font-serif text-xl font-light">{member.title}</span>
                  {member.description && (
                    <span className="mt-2 block font-serif text-sm font-light text-slate">
                      {member.description}
                    </span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {editing && (
        <Drawer title={editing === 'new' ? 'Nuevo paso' : 'Editar paso'} onClose={() => setEditing(null)}>
          <MemberEditor
            key={editing === 'new' ? 'new-member' : editing.id}
            member={editing === 'new' ? null : editing}
            defaultOrder={nextOrder}
            saving={saving}
            onUpload={(file) => repo.uploadImage(file, 'equipo')}
            onSubmit={(draft) => void run(() => repo.saveMember(draft), 'Paso guardado.')}
            onDelete={
              editing === 'new'
                ? undefined
                : () => void run(() => repo.deleteMember(editing.id), 'Paso eliminado.')
            }
          />
        </Drawer>
      )}
    </div>
  )
}

function MemberEditor({
  member,
  defaultOrder,
  saving,
  onUpload,
  onSubmit,
  onDelete,
}: {
  member: TeamMember | null
  defaultOrder: number
  saving: boolean
  onUpload: (file: File) => Promise<string>
  onSubmit: (draft: MemberDraft) => void
  onDelete?: () => void
}) {
  const [draft, setDraft] = useState<MemberDraft>({
    id: member?.id,
    title: member?.title ?? '',
    description: member?.description ?? '',
    image_url: member?.image_url ?? '',
    sort_order: member?.sort_order ?? defaultOrder,
  })
  const [formError, setFormError] = useState<string | null>(null)
  const [confirming, setConfirming] = useState(false)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!draft.title.trim()) {
      setFormError('El título es obligatorio.')
      return
    }
    setFormError(null)
    onSubmit(draft)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {formError && <p className="font-serif text-sm font-light text-red-800">{formError}</p>}
      <ImageField
        label="Imagen"
        hint="Opcional. Si la dejas vacía, el inicio muestra solo el número del paso."
        value={draft.image_url}
        onChange={(image_url) => setDraft({ ...draft, image_url })}
        onUpload={onUpload}
      />
      <Field label="Título">
        <TextInput
          required
          value={draft.title}
          onChange={(event) => setDraft({ ...draft, title: event.target.value })}
        />
      </Field>
      <Field label="Texto">
        <TextArea
          rows={4}
          value={draft.description}
          onChange={(event) => setDraft({ ...draft, description: event.target.value })}
        />
      </Field>
      <Field label="Orden">
        <TextInput
          type="number"
          value={draft.sort_order}
          onChange={(event) => setDraft({ ...draft, sort_order: Number(event.target.value) })}
        />
      </Field>
      <div className="flex flex-wrap gap-3">
        <AdminButton type="submit" disabled={saving}>
          {saving ? 'Guardando' : 'Guardar'}
        </AdminButton>
        {onDelete && (
          <AdminButton
            tone="danger"
            disabled={saving}
            onClick={() => {
              if (!confirming) {
                setConfirming(true)
                return
              }
              onDelete()
            }}
          >
            {confirming ? 'Confirmar eliminación' : 'Eliminar'}
          </AdminButton>
        )}
      </div>
    </form>
  )
}
