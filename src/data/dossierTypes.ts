export interface DossierImage {
  file: string
  caption: string
  src?: string
}

export interface DossierSection {
  id: string
  nav: string
  kicker: string
  title: string
  emphasis?: string
  paragraphs: string[]
  highlights?: string[]
  images: DossierImage[]
  variant: 'light' | 'dark' | 'beige'
}

export interface DossierPageContent {
  path: string
  seoTitle: string
  seoDescription: string
  kicker: string
  title: string
  emphasis?: string
  lead: string
  sections: DossierSection[]
}

export function dossierImageUrl(fileOrImage: string | DossierImage) {
  if (typeof fileOrImage !== 'string' && fileOrImage.src) return fileOrImage.src
  const file = typeof fileOrImage === 'string' ? fileOrImage : fileOrImage.file
  return `/dossier/${encodeURIComponent(file)}`
}
