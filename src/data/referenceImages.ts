export const referenceImages = [
  '/images/hero-ref-01.webp',
  '/images/hero-ref-02.webp',
  '/images/hero-ref-03.webp',
  '/images/hero-ref-04.webp',
  '/images/hero-ref-05.webp',
] as const

export function getReferenceImage(index: number): string {
  return referenceImages[index % referenceImages.length]
}
