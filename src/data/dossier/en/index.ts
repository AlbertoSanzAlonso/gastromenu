import { atrilesPage } from '@/data/dossier/atriles'
import { blogPage } from '@/data/dossier/blog'
import { cartasPage } from '@/data/dossier/cartas'
import { exclusividadesPage } from '@/data/dossier/exclusividades'
import { mantelesPage } from '@/data/dossier/manteles'
import { nosotrosPage } from '@/data/dossier/nosotros'
import type { DossierPageContent } from '@/data/dossierTypes'
import { translateDossier } from '@/i18n/translateDossier'
import type { Locale } from '@/i18n/locale'
import { atrilesCopy } from '@/data/dossier/en/atriles'
import { blogCopy } from '@/data/dossier/en/blog'
import { cartasCopy } from '@/data/dossier/en/cartas'
import { exclusividadesCopy } from '@/data/dossier/en/exclusividades'
import { mantelesCopy } from '@/data/dossier/en/manteles'
import { nosotrosCopy } from '@/data/dossier/en/nosotros'

const englishPages: Record<string, DossierPageContent> = {
  [nosotrosPage.path]: translateDossier(nosotrosPage, nosotrosCopy),
  [cartasPage.path]: translateDossier(cartasPage, cartasCopy),
  [atrilesPage.path]: translateDossier(atrilesPage, atrilesCopy),
  [mantelesPage.path]: translateDossier(mantelesPage, mantelesCopy),
  [exclusividadesPage.path]: translateDossier(exclusividadesPage, exclusividadesCopy),
  [blogPage.path]: translateDossier(blogPage, blogCopy),
}

export function localizeDossier(content: DossierPageContent, locale: Locale) {
  if (locale === 'es') return content
  return englishPages[content.path] ?? content
}
