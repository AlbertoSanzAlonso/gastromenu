import { atrilesPage } from '@/data/dossier/atriles'
import { blogPage } from '@/data/dossier/blog'
import { cartasPage } from '@/data/dossier/cartas'
import { exclusividadesPage } from '@/data/dossier/exclusividades'
import { mantelesPage } from '@/data/dossier/manteles'
import { nosotrosPage } from '@/data/dossier/nosotros'
import type { DossierPageContent } from '@/data/dossierTypes'

export interface DossierEntry {
  slug: string
  content: DossierPageContent
}

export const dossierPages: DossierEntry[] = [
  { slug: 'nosotros', content: nosotrosPage },
  { slug: 'cartas', content: cartasPage },
  { slug: 'atriles', content: atrilesPage },
  { slug: 'manteles', content: mantelesPage },
  { slug: 'exclusividades', content: exclusividadesPage },
  { slug: 'blog', content: blogPage },
]

export function dossierPageBySlug(slug: string) {
  return dossierPages.find((entry) => entry.slug === slug)?.content
}
