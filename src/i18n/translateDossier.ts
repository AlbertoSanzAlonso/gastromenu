import type { DossierPageContent } from '@/data/dossierTypes'

export interface DossierSectionCopy {
  nav: string
  kicker: string
  title: string
  emphasis?: string
  paragraphs: string[]
  highlights?: string[]
  captions?: string[]
}

export interface DossierCopy {
  seoTitle: string
  seoDescription: string
  kicker: string
  title: string
  emphasis?: string
  lead: string
  sections: DossierSectionCopy[]
}

export function translateDossier(base: DossierPageContent, copy: DossierCopy): DossierPageContent {
  if (copy.sections.length !== base.sections.length) {
    throw new Error(`Traducción incompleta para ${base.path}`)
  }

  return {
    ...base,
    seoTitle: copy.seoTitle,
    seoDescription: copy.seoDescription,
    kicker: copy.kicker,
    title: copy.title,
    emphasis: copy.emphasis,
    lead: copy.lead,
    sections: base.sections.map((section, index) => {
      const next = copy.sections[index]
      return {
        ...section,
        nav: next.nav,
        kicker: next.kicker,
        title: next.title,
        emphasis: next.emphasis,
        paragraphs: next.paragraphs,
        highlights: next.highlights ?? section.highlights,
        images: section.images.map((image, imageIndex) => ({
          ...image,
          caption: next.captions?.[imageIndex] ?? image.caption,
        })),
      }
    }),
  }
}
