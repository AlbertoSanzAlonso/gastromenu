import type { DossierPageContent } from '@/data/dossierTypes'

function contentApiBase() {
  const value = import.meta.env.VITE_CONTENT_API
  if (!value) return null
  return value.replace(/\/$/, '')
}

function isDossierPage(value: unknown): value is DossierPageContent {
  if (!value || typeof value !== 'object') return false
  const page = value as Partial<DossierPageContent>
  return (
    typeof page.path === 'string' &&
    typeof page.seoTitle === 'string' &&
    typeof page.title === 'string' &&
    typeof page.lead === 'string' &&
    Array.isArray(page.sections)
  )
}

export async function loadDossierPage(
  slug: string,
  fallback: DossierPageContent,
): Promise<DossierPageContent> {
  const base = contentApiBase()
  if (!base) return fallback

  try {
    const response = await fetch(`${base}/api/content/${slug}`)
    if (!response.ok) return fallback
    const data: unknown = await response.json()
    return isDossierPage(data) ? data : fallback
  } catch {
    return fallback
  }
}
