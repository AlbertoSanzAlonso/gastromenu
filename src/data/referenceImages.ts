export const referenceImages = [
  '/images/gallery/cervantes-vinos.jpg',
  '/images/gallery/haruki-japones.jpg',
  '/images/gallery/reserva-uvi.jpg',
  '/images/gallery/asador-inaki.jpg',
  '/images/gallery/jaipur-palace.jpg',
  '/images/gallery/plaza-vinos.jpg',
  '/images/gallery/diseno-esencia.png',
  '/images/gallery/bella-coppia.jpg',
  '/images/gallery/paella-menu.jpg',
  '/images/gallery/carihuela-chica.jpg',
  '/images/gallery/artesania-coleccion.png',
  '/images/gallery/gastromenu-brand.png',
  '/images/gallery/asador-carne.jpg',
  '/images/gallery/bistrobar-triptico.jpg',
  '/images/gallery/angus-sirloin.jpg',
  '/images/gallery/cave-vinos.jpg',
] as const

export function getReferenceImage(index: number): string {
  return referenceImages[index % referenceImages.length]
}
