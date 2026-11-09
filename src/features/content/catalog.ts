export const siteContentDefaults = {
  hero_image: '/images/hero-ref-01.webp',
  hero_title: 'La excelencia\ncomo destino',
  hero_quote: 'A veces una primera impresión es la que queda para siempre…',
  about_text:
    'En GastroMenú Premium llevamos 28 años trabajando para restaurantes que entienden que cada detalle cuenta.\n\nDiseñamos y elaboramos artesanalmente cartas de menú, manteles personalizados rígidos, flexibles y descartables y atriles personalizados, fabricados en acero galvanizado, con pantallas luminosas de alto impacto visual. Piel, semipiel, tejidos, maderas seleccionadas, tapas rígidas, Alubond y acero son algunos de los materiales con los que damos forma a soluciones pensadas específicamente para el mundo de la restauración.\n\nPor eso desarrollamos productos personalizados que no solo cumplen una función, sino que comunican el carácter del establecimiento, refuerzan su identidad y contribuyen a crear una experiencia coherente desde el primer contacto.\n\n28 años de experiencia. Diseño personalizado. Elaboración artesanal.',
} as const

export type SiteContentKey = keyof typeof siteContentDefaults

export interface ContentField {
  key: SiteContentKey
  label: string
  description: string
  kind: 'text' | 'image'
  rows?: number
}

export const contentFields: ContentField[] = [
  {
    key: 'hero_image',
    label: 'Imagen de portada',
    description: 'Fotografía principal del inicio. Si la dejas vacía, la web usa la imagen de reserva.',
    kind: 'image',
  },
  {
    key: 'hero_title',
    label: 'Titular de portada',
    description: 'Un salto de línea parte el título. La última palabra de la última línea se muestra en oro.',
    kind: 'text',
    rows: 3,
  },
  {
    key: 'hero_quote',
    label: 'Cita de portada',
    description: 'Frase bajo el titular. La web añade las comillas.',
    kind: 'text',
    rows: 3,
  },
  {
    key: 'about_text',
    label: 'Texto de nosotros',
    description: 'Párrafos de la portada. Sepáralos con una línea en blanco.',
    kind: 'text',
    rows: 8,
  },
]

export function paragraphsOf(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}
