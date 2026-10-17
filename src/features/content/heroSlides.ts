export interface HeroSlide {
  id: string
  image: string
  alt: string
  label: string
  title: string
  quote: string
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
    label: 'Cartas de vino',
    title: 'La piel\nque recibe',
    quote: 'Tornillos vistos y cantoneras de oro para una carta que se recuerda en la mano.',
  },
  {
    id: 'jaipur',
    image: '/images/gallery/jaipur-palace.jpg',
    alt: 'Carta Jaipur Palace en semipiel verde con pavo real estampado en oro',
    label: 'Stamping en oro',
    title: 'Un nombre\nen oro',
    quote: 'El pavo real queda estampado para que la mesa hable antes que la carta.',
  },
  {
    id: 'reserva-uvi',
    image: '/images/gallery/reserva-uvi.jpg',
    alt: 'Carta Reserva UVI con corona en relieve sobre portada bicolor',
    label: 'Reserva UVI',
    title: 'Relieve\nque se toca',
    quote: 'La corona se siente con los dedos antes de abrir la primera página.',
  },
  {
    id: 'haruki',
    image: '/images/gallery/haruki-japones.jpg',
    alt: 'Carta japonesa Haruki con troquel seco',
    label: 'Troquel japonés',
    title: 'Oro sobre\nla noche',
    quote: 'Dos koi y un troquel seco, pensados para una mesa que no necesita alzar la voz.',
  },
  {
    id: 'plaza',
    image: '/images/gallery/plaza-vinos.jpg',
    alt: 'Carta de vinos y bebidas Plaza Cafetería, impresa sobre madera',
    label: 'Impresión en madera',
    title: 'La madera\nse queda',
    quote: 'Vino, corcho y el nombre del local, impresos para acompañar la mesa.',
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
