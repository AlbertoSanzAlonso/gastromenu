export interface HeroSlide {
  id: string
  image: string
  alt: string
  caption: string
}

/**
 * Imágenes extra del carrusel de portada.
 * Hoy son de ejemplo; más adelante las sustituye lo que se guarde en el admin.
 */
export const mockHeroSlides: HeroSlide[] = [
  {
    id: 'cervantes',
    image: '/images/gallery/cervantes-vinos.jpg',
    alt: 'Carta de vinos Cervantes en piel, con cantoneras y tornillos vistos',
    caption: 'Carta de vinos en piel',
  },
  {
    id: 'jaipur',
    image: '/images/gallery/jaipur-palace.jpg',
    alt: 'Carta Jaipur Palace en semipiel verde con pavo real estampado en oro',
    caption: 'Stamping en oro',
  },
  {
    id: 'reserva-uvi',
    image: '/images/gallery/reserva-uvi.jpg',
    alt: 'Carta Reserva UVI con corona en relieve sobre portada bicolor',
    caption: 'Relieve Reserva UVI',
  },
  {
    id: 'haruki',
    image: '/images/gallery/haruki-japones.jpg',
    alt: 'Carta japonesa Haruki con troquel seco',
    caption: 'Carta japonesa troquelada',
  },
  {
    id: 'plaza',
    image: '/images/gallery/plaza-vinos.jpg',
    alt: 'Carta de vinos y bebidas Plaza Cafetería, impresa sobre madera',
    caption: 'Carta en madera',
  },
]

export function composeHeroSlides(current: HeroSlide, extras: HeroSlide[] = mockHeroSlides) {
  const seen = new Set<string>()
  return [current, ...extras].filter((slide) => {
    if (seen.has(slide.image)) return false
    seen.add(slide.image)
    return true
  })
}

export function slideOffset(position: number, current: number, total: number) {
  if (total <= 1) return 0
  let diff = position - current
  const half = total / 2
  if (diff > half) diff -= total
  if (diff < -half) diff += total
  return diff
}
