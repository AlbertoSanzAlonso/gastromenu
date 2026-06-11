import { useEffect, useState } from 'react'
import { fallbackCategories, fallbackGalleryItems } from '@/data/fallback'
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client'
import type { GalleryCategory, GalleryItem } from '@/lib/supabase/types'

interface GalleryData {
  categories: GalleryCategory[]
  items: GalleryItem[]
  loading: boolean
  error: string | null
}

export function useGallery(): GalleryData {
  const [categories, setCategories] = useState<GalleryCategory[]>(fallbackCategories)
  const [items, setItems] = useState<GalleryItem[]>(fallbackGalleryItems)
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured) return

    async function fetchGallery() {
      try {
        const [categoriesRes, itemsRes] = await Promise.all([
          supabase!
            .from('gallery_categories')
            .select('*')
            .order('sort_order'),
          supabase!
            .from('gallery_items')
            .select('*')
            .order('sort_order'),
        ])

        if (categoriesRes.error) throw categoriesRes.error
        if (itemsRes.error) throw itemsRes.error

        if (categoriesRes.data?.length) setCategories(categoriesRes.data as GalleryCategory[])
        if (itemsRes.data?.length) setItems(itemsRes.data as GalleryItem[])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar la galería')
      } finally {
        setLoading(false)
      }
    }

    fetchGallery()
  }, [])

  return { categories, items, loading, error }
}

export function getItemsByCategory(
  items: GalleryItem[],
  categoryId: string,
): GalleryItem[] {
  return items.filter((item) => item.category_id === categoryId)
}
