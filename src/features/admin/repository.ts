import { supabase } from '@/lib/supabase/client'
import type { GalleryCategory, GalleryItem, SiteContent, TeamMember } from '@/lib/supabase/types'
import { loadLocal, saveLocal, type InquiryRecord } from '@/features/admin/localStore'

export interface CategoryDraft {
  id?: string
  slug: string
  title: string
  subtitle: string
  sort_order: number
}

export interface ItemDraft {
  id?: string
  category_id: string
  title: string
  description: string
  image_url: string
  sort_order: number
  featured: boolean
}

export interface MemberDraft {
  id?: string
  title: string
  description: string
  image_url: string
  sort_order: number
}

export interface AdminRepository {
  listCategories(): Promise<GalleryCategory[]>
  saveCategory(draft: CategoryDraft): Promise<void>
  deleteCategory(id: string): Promise<void>
  listItems(): Promise<GalleryItem[]>
  saveItem(draft: ItemDraft): Promise<void>
  deleteItem(id: string): Promise<void>
  listTeam(): Promise<TeamMember[]>
  saveMember(draft: MemberDraft): Promise<void>
  deleteMember(id: string): Promise<void>
  listContent(): Promise<SiteContent[]>
  saveContent(key: string, value: string): Promise<void>
  deleteContent(id: string): Promise<void>
  listInquiries(): Promise<InquiryRecord[]>
  uploadImage(file: File, folder: string): Promise<string>
}

function emptyToNull(value: string) {
  const trimmed = value.trim()
  return trimmed ? trimmed : null
}

function toOrder(value: number) {
  if (!Number.isFinite(value)) return 0
  return Math.round(value)
}

function raise(error: { message: string } | null) {
  if (error) throw error
}

function byOrder<T extends { sort_order: number }>(rows: T[]) {
  return [...rows].sort((a, b) => a.sort_order - b.sort_order || 0)
}

function safeFileName(name: string) {
  const normalized = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/^-|-$/g, '')
  return normalized || 'imagen'
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('No se pudo leer la imagen.'))
    reader.readAsDataURL(file)
  })
}

const localRepository: AdminRepository = {
  async listCategories() {
    return byOrder(loadLocal().categories)
  },
  async saveCategory(draft) {
    const data = loadLocal()
    const payload: GalleryCategory = {
      id: draft.id ?? crypto.randomUUID(),
      slug: draft.slug.trim(),
      title: draft.title.trim(),
      subtitle: emptyToNull(draft.subtitle),
      sort_order: toOrder(draft.sort_order),
      created_at: data.categories.find((category) => category.id === draft.id)?.created_at ?? new Date().toISOString(),
    }
    const index = data.categories.findIndex((category) => category.id === payload.id)
    if (index >= 0) data.categories[index] = payload
    else data.categories.push(payload)
    saveLocal(data)
  },
  async deleteCategory(id) {
    const data = loadLocal()
    data.categories = data.categories.filter((category) => category.id !== id)
    data.items = data.items.filter((item) => item.category_id !== id)
    saveLocal(data)
  },
  async listItems() {
    return byOrder(loadLocal().items)
  },
  async saveItem(draft) {
    const data = loadLocal()
    const payload: GalleryItem = {
      id: draft.id ?? crypto.randomUUID(),
      category_id: draft.category_id,
      title: draft.title.trim(),
      description: emptyToNull(draft.description),
      image_url: emptyToNull(draft.image_url),
      sort_order: toOrder(draft.sort_order),
      featured: draft.featured,
      created_at: data.items.find((item) => item.id === draft.id)?.created_at ?? new Date().toISOString(),
    }
    const index = data.items.findIndex((item) => item.id === payload.id)
    if (index >= 0) data.items[index] = payload
    else data.items.push(payload)
    saveLocal(data)
  },
  async deleteItem(id) {
    const data = loadLocal()
    data.items = data.items.filter((item) => item.id !== id)
    saveLocal(data)
  },
  async listTeam() {
    return byOrder(loadLocal().team)
  },
  async saveMember(draft) {
    const data = loadLocal()
    const payload: TeamMember = {
      id: draft.id ?? crypto.randomUUID(),
      title: draft.title.trim(),
      description: emptyToNull(draft.description),
      image_url: emptyToNull(draft.image_url),
      sort_order: toOrder(draft.sort_order),
      created_at: data.team.find((member) => member.id === draft.id)?.created_at ?? new Date().toISOString(),
    }
    const index = data.team.findIndex((member) => member.id === payload.id)
    if (index >= 0) data.team[index] = payload
    else data.team.push(payload)
    saveLocal(data)
  },
  async deleteMember(id) {
    const data = loadLocal()
    data.team = data.team.filter((member) => member.id !== id)
    saveLocal(data)
  },
  async listContent() {
    return [...loadLocal().content].sort((a, b) => a.key.localeCompare(b.key))
  },
  async saveContent(key, value) {
    const data = loadLocal()
    const now = new Date().toISOString()
    const index = data.content.findIndex((row) => row.key === key)
    if (index >= 0) {
      data.content[index] = { ...data.content[index], value, updated_at: now }
    } else {
      data.content.push({ id: crypto.randomUUID(), key, value, updated_at: now })
    }
    saveLocal(data)
  },
  async deleteContent(id) {
    const data = loadLocal()
    data.content = data.content.filter((row) => row.id !== id)
    saveLocal(data)
  },
  async listInquiries() {
    return [...loadLocal().inquiries].sort((a, b) => b.created_at.localeCompare(a.created_at))
  },
  async uploadImage(file) {
    if (!file.type.startsWith('image/')) throw new Error('El archivo tiene que ser una imagen.')
    if (file.size > 1_500_000) {
      throw new Error('En la copia local la imagen no puede superar 1,5 MB.')
    }
    return readFileAsDataUrl(file)
  },
}

const remoteRepository: AdminRepository = {
  async listCategories() {
    const { data, error } = await supabase.from('gallery_categories').select('*').order('sort_order')
    raise(error)
    return (data ?? []) as GalleryCategory[]
  },
  async saveCategory(draft) {
    const payload = {
      slug: draft.slug.trim(),
      title: draft.title.trim(),
      subtitle: emptyToNull(draft.subtitle),
      sort_order: toOrder(draft.sort_order),
    }
    if (draft.id) {
      const { error } = await supabase.from('gallery_categories').update(payload).eq('id', draft.id)
      raise(error)
      return
    }
    const { error } = await supabase.from('gallery_categories').insert(payload)
    raise(error)
  },
  async deleteCategory(id) {
    const { error } = await supabase.from('gallery_categories').delete().eq('id', id)
    raise(error)
  },
  async listItems() {
    const { data, error } = await supabase.from('gallery_items').select('*').order('sort_order')
    raise(error)
    return (data ?? []) as GalleryItem[]
  },
  async saveItem(draft) {
    const payload = {
      category_id: draft.category_id,
      title: draft.title.trim(),
      description: emptyToNull(draft.description),
      image_url: emptyToNull(draft.image_url),
      sort_order: toOrder(draft.sort_order),
      featured: draft.featured,
    }
    if (draft.id) {
      const { error } = await supabase.from('gallery_items').update(payload).eq('id', draft.id)
      raise(error)
      return
    }
    const { error } = await supabase.from('gallery_items').insert(payload)
    raise(error)
  },
  async deleteItem(id) {
    const { error } = await supabase.from('gallery_items').delete().eq('id', id)
    raise(error)
  },
  async listTeam() {
    const { data, error } = await supabase.from('team_members').select('*').order('sort_order')
    raise(error)
    return (data ?? []) as TeamMember[]
  },
  async saveMember(draft) {
    const payload = {
      title: draft.title.trim(),
      description: emptyToNull(draft.description),
      image_url: emptyToNull(draft.image_url),
      sort_order: toOrder(draft.sort_order),
    }
    if (draft.id) {
      const { error } = await supabase.from('team_members').update(payload).eq('id', draft.id)
      raise(error)
      return
    }
    const { error } = await supabase.from('team_members').insert(payload)
    raise(error)
  },
  async deleteMember(id) {
    const { error } = await supabase.from('team_members').delete().eq('id', id)
    raise(error)
  },
  async listContent() {
    const { data, error } = await supabase.from('site_content').select('*').order('key')
    raise(error)
    return (data ?? []) as SiteContent[]
  },
  async saveContent(key, value) {
    const existing = await supabase.from('site_content').select('id').eq('key', key).maybeSingle()
    raise(existing.error)
    if (existing.data?.id) {
      const { error } = await supabase
        .from('site_content')
        .update({ value, updated_at: new Date().toISOString() })
        .eq('id', existing.data.id)
      raise(error)
      return
    }
    const { error } = await supabase.from('site_content').insert({ key, value })
    raise(error)
  },
  async deleteContent(id) {
    const { error } = await supabase.from('site_content').delete().eq('id', id)
    raise(error)
  },
  async listInquiries() {
    const { data, error } = await supabase
      .from('contact_inquiries')
      .select('*')
      .order('created_at', { ascending: false })
    raise(error)
    return (data ?? []) as InquiryRecord[]
  },
  async uploadImage(file, folder) {
    if (!file.type.startsWith('image/')) throw new Error('El archivo tiene que ser una imagen.')
    if (file.size > 8_000_000) throw new Error('La imagen no puede superar 8 MB.')
    const path = `${folder}/${crypto.randomUUID()}-${safeFileName(file.name)}`
    const uploaded = await supabase.storage.from('media').upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    })
    raise(uploaded.error)
    const { data } = supabase.storage.from('media').getPublicUrl(path)
    return data.publicUrl
  },
}

export function createRepository(mode: 'local' | 'remote'): AdminRepository {
  return mode === 'local' ? localRepository : remoteRepository
}
