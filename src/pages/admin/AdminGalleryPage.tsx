import { useCallback, useState, type FormEvent, type ReactNode } from 'react'
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
import type { CategoryDraft, ItemDraft } from '@/features/admin/repository'
import { useAdminAuth } from '@/features/admin/session'
import { useAdminList } from '@/features/admin/useAdminList'
import type { GalleryCategory, GalleryItem } from '@/lib/supabase/types'

export function AdminGalleryPage() {
  const { repo } = useAdminAuth()
  const { notify } = useNotice()
  const loadCategories = useCallback(() => repo.listCategories(), [repo])
  const loadItems = useCallback(() => repo.listItems(), [repo])
  const categories = useAdminList(loadCategories, [] as GalleryCategory[])
  const items = useAdminList(loadItems, [] as GalleryItem[])
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [editingItem, setEditingItem] = useState<GalleryItem | 'new' | null>(null)
  const [editingCategory, setEditingCategory] = useState<GalleryCategory | 'new' | null>(null)
  const [saving, setSaving] = useState(false)

  const visible = items.data.filter((item) => {
    const matchesCategory = filter === 'all' || item.category_id === filter
    const haystack = `${item.title} ${item.description ?? ''}`.toLowerCase()
    return matchesCategory && haystack.includes(query.trim().toLowerCase())
  })
  const nextItemOrder = items.data.reduce((max, item) => Math.max(max, item.sort_order), 0) + 1
  const nextCategoryOrder = categories.data.reduce((max, category) => Math.max(max, category.sort_order), 0) + 1
  const loading = (categories.loading && categories.data.length === 0) || (items.loading && items.data.length === 0)

  async function run(action: () => Promise<void>, message: string) {
    setSaving(true)
    try {
      await action()
      notify('ok', message)
      setEditingItem(null)
      setEditingCategory(null)
      await Promise.all([categories.reload(), items.reload()])
    } catch (err) {
      notify('error', errorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl">
      <AdminHeader
        eyebrow="Colección"
        title="Galería"
        description="Imágenes, títulos y textos de las piezas. Cada pieza pertenece a una categoría."
        action={
          <div className="flex flex-wrap gap-3">
            <AdminButton
              tone="ghost"
              onClick={() => {
                setEditingItem(null)
                setEditingCategory('new')
              }}
            >
              Nueva categoría
            </AdminButton>
            <AdminButton
              onClick={() => {
                setEditingCategory(null)
                setEditingItem('new')
              }}
              disabled={categories.data.length === 0}
            >
              Nueva pieza
            </AdminButton>
          </div>
        }
      />

      {(categories.error || items.error) && (
        <ErrorNote
          message={categories.error ?? items.error ?? 'No se pudo cargar la galería.'}
          onRetry={() => {
            void categories.reload()
            void items.reload()
          }}
        />
      )}

      {loading ? (
        <LoadingNote label="Cargando galería" />
      ) : (
        <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <aside className="space-y-3">
            <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
              Todas
              <span className="text-stone">{items.data.length}</span>
            </FilterButton>
            {categories.data.map((category) => (
              <div key={category.id} className="flex gap-2">
                <FilterButton
                  active={filter === category.id}
                  onClick={() => setFilter(category.id)}
                >
                  <span className="truncate">{category.title}</span>
                  <span className="text-stone">
                    {items.data.filter((item) => item.category_id === category.id).length}
                  </span>
                </FilterButton>
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(null)
                    setEditingCategory(category)
                  }}
                  className="shrink-0 border border-beige-300 bg-white px-3 font-label text-[10px] uppercase tracking-[0.14em] text-stone hover:border-gold-slide"
                >
                  Editar
                </button>
              </div>
            ))}
          </aside>

          <div>
            <TextInput
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por título o texto"
              className="mb-5"
              aria-label="Buscar piezas"
            />
            {visible.length === 0 ? (
              <EmptyNote title="No hay piezas">
                Crea una pieza o cambia el filtro.
              </EmptyNote>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {visible.map((item) => {
                  const category = categories.data.find((entry) => entry.id === item.category_id)
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCategory(null)
                          setEditingItem(item)
                        }}
                        className="w-full border border-beige-300 bg-white text-left transition-colors hover:border-gold-slide"
                      >
                        <div className="aspect-[4/3] bg-ink">
                          {item.image_url ? (
                            <img src={item.image_url} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <div className="grid h-full place-items-center font-serif text-sm font-light text-cream-muted">
                              Sin imagen
                            </div>
                          )}
                        </div>
                        <div className="space-y-2 px-4 py-4">
                          <p className="font-label text-[10px] uppercase tracking-[0.18em] text-gold-dark">
                            {category?.title ?? 'Sin categoría'}
                            {item.featured ? ' · Destacada' : ''}
                          </p>
                          <h2 className="font-serif text-xl font-light">{item.title}</h2>
                          {item.description && (
                            <p className="line-clamp-2 font-serif text-sm font-light text-slate">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      )}

      {editingItem && (
        <Drawer
          title={editingItem === 'new' ? 'Nueva pieza' : 'Editar pieza'}
          onClose={() => setEditingItem(null)}
        >
          <ItemEditor
            key={editingItem === 'new' ? 'new-item' : editingItem.id}
            item={editingItem === 'new' ? null : editingItem}
            categories={categories.data}
            defaultOrder={nextItemOrder}
            saving={saving}
            onUpload={(file) => repo.uploadImage(file, 'galeria')}
            onSubmit={(draft) => void run(() => repo.saveItem(draft), 'Pieza guardada.')}
            onDelete={
              editingItem === 'new'
                ? undefined
                : () => void run(() => repo.deleteItem(editingItem.id), 'Pieza eliminada.')
            }
          />
        </Drawer>
      )}

      {editingCategory && (
        <Drawer
          title={editingCategory === 'new' ? 'Nueva categoría' : 'Editar categoría'}
          onClose={() => setEditingCategory(null)}
        >
          <CategoryEditor
            key={editingCategory === 'new' ? 'new-category' : editingCategory.id}
            category={editingCategory === 'new' ? null : editingCategory}
            defaultOrder={nextCategoryOrder}
            saving={saving}
            onSubmit={(draft) => void run(() => repo.saveCategory(draft), 'Categoría guardada.')}
            onDelete={
              editingCategory === 'new'
                ? undefined
                : () => {
                    const id = editingCategory.id
                    return run(async () => {
                      await repo.deleteCategory(id)
                      if (filter === id) setFilter('all')
                    }, 'Categoría eliminada.')
                  }
            }
          />
        </Drawer>
      )}
    </div>
  )
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full min-w-0 flex-1 items-center justify-between gap-3 border bg-white px-3 py-3 text-left font-serif text-sm font-light ${
        active ? 'border-gold-slide' : 'border-beige-300'
      }`}
    >
      {children}
    </button>
  )
}

function ItemEditor({
  item,
  categories,
  defaultOrder,
  saving,
  onUpload,
  onSubmit,
  onDelete,
}: {
  item: GalleryItem | null
  categories: GalleryCategory[]
  defaultOrder: number
  saving: boolean
  onUpload: (file: File) => Promise<string>
  onSubmit: (draft: ItemDraft) => void
  onDelete?: () => void
}) {
  const [draft, setDraft] = useState<ItemDraft>({
    id: item?.id,
    category_id: item?.category_id ?? categories[0]?.id ?? '',
    title: item?.title ?? '',
    description: item?.description ?? '',
    image_url: item?.image_url ?? '',
    sort_order: item?.sort_order ?? defaultOrder,
    featured: item?.featured ?? false,
  })
  const [formError, setFormError] = useState<string | null>(null)
  const [confirming, setConfirming] = useState(false)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!draft.title.trim()) {
      setFormError('El título es obligatorio.')
      return
    }
    if (!draft.category_id) {
      setFormError('Elige una categoría.')
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
        hint="Puedes subir un archivo o pegar una ruta."
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
      <Field label="Categoría">
        <select
          value={draft.category_id}
          onChange={(event) => setDraft({ ...draft, category_id: event.target.value })}
          className="w-full border border-beige-300 bg-white px-4 py-3 font-serif text-base font-light outline-none focus:border-gold-slide"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Orden">
        <TextInput
          type="number"
          value={draft.sort_order}
          onChange={(event) => setDraft({ ...draft, sort_order: Number(event.target.value) })}
        />
      </Field>
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={draft.featured}
          onChange={(event) => setDraft({ ...draft, featured: event.target.checked })}
          className="h-4 w-4 accent-gold-dark"
        />
        <span className="font-label text-[11px] uppercase tracking-[0.16em]">Destacada</span>
      </label>
      <div className="flex flex-wrap gap-3 pt-2">
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

function CategoryEditor({
  category,
  defaultOrder,
  saving,
  onSubmit,
  onDelete,
}: {
  category: GalleryCategory | null
  defaultOrder: number
  saving: boolean
  onSubmit: (draft: CategoryDraft) => void
  onDelete?: () => void
}) {
  const [draft, setDraft] = useState<CategoryDraft>({
    id: category?.id,
    slug: category?.slug ?? '',
    title: category?.title ?? '',
    subtitle: category?.subtitle ?? '',
    sort_order: category?.sort_order ?? defaultOrder,
  })
  const [formError, setFormError] = useState<string | null>(null)
  const [confirming, setConfirming] = useState(false)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const slug = draft.slug.trim() || slugify(draft.title)
    if (!draft.title.trim() || !slug) {
      setFormError('El título y el identificador son obligatorios.')
      return
    }
    setFormError(null)
    onSubmit({ ...draft, slug })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {formError && <p className="font-serif text-sm font-light text-red-800">{formError}</p>}
      <Field label="Título">
        <TextInput
          required
          value={draft.title}
          onChange={(event) => setDraft({ ...draft, title: event.target.value })}
        />
      </Field>
      <Field label="Subtítulo">
        <TextInput
          value={draft.subtitle}
          onChange={(event) => setDraft({ ...draft, subtitle: event.target.value })}
        />
      </Field>
      <Field label="Identificador" hint="Se usa en la dirección interna. Si lo dejas vacío, se crea desde el título.">
        <TextInput
          value={draft.slug}
          onChange={(event) => setDraft({ ...draft, slug: event.target.value })}
          placeholder="cartas-de-vino"
        />
      </Field>
      <Field label="Orden">
        <TextInput
          type="number"
          value={draft.sort_order}
          onChange={(event) => setDraft({ ...draft, sort_order: Number(event.target.value) })}
        />
      </Field>
      {onDelete && (
        <p className="font-serif text-sm font-light text-slate">
          Al eliminar la categoría también se eliminan sus piezas.
        </p>
      )}
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

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
