import { fallbackCategories, fallbackGalleryItems, fallbackTeam } from '@/data/fallback'
import { siteContentDefaults } from '@/features/content/catalog'
import type {
  ContactInquiry,
  GalleryCategory,
  GalleryItem,
  SiteContent,
  TeamMember,
} from '@/lib/supabase/types'

const STORAGE_KEY = 'gastromenu.admin.local'
const CHANGE_EVENT = 'gastromenu-content'

export interface InquiryRecord extends ContactInquiry {
  id: string
  created_at: string
}

export interface LocalData {
  categories: GalleryCategory[]
  items: GalleryItem[]
  team: TeamMember[]
  content: SiteContent[]
  inquiries: InquiryRecord[]
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function createSeed(): LocalData {
  const now = '2026-10-01T10:30:00.000Z'

  return {
    categories: clone(fallbackCategories),
    items: clone(fallbackGalleryItems),
    team: clone(fallbackTeam),
    content: (Object.keys(siteContentDefaults) as Array<keyof typeof siteContentDefaults>).map(
      (key) => ({
        id: `content-${key}`,
        key,
        value: siteContentDefaults[key],
        updated_at: now,
      }),
    ),
    inquiries: [
      {
        id: 'inquiry-demo',
        establishment_name: 'La Cepa',
        establishment_type: 'Restaurante',
        contact_first_name: 'María',
        contact_last_name: 'López',
        phone: '+34 600 000 000',
        address: 'Marbella',
        email: 'maria@example.com',
        interests: ['Cartas menú (vinos, postres, etc.)'],
        message: 'Nos gustaría renovar la carta de vinos.',
        privacy_accepted: true,
        created_at: now,
      },
    ],
  }
}

export function readLocalData(): LocalData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as LocalData
    if (!parsed || !Array.isArray(parsed.categories) || !Array.isArray(parsed.items)) return null
    return parsed
  } catch {
    return null
  }
}

function write(data: LocalData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export function loadLocal(): LocalData {
  const existing = readLocalData()
  if (existing) return existing
  const seeded = createSeed()
  write(seeded)
  return seeded
}

export function saveLocal(data: LocalData) {
  write(data)
}

export function clearLocalData() {
  localStorage.removeItem(STORAGE_KEY)
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export function subscribeLocalChanges(listener: () => void) {
  window.addEventListener(CHANGE_EVENT, listener)
  return () => window.removeEventListener(CHANGE_EVENT, listener)
}
