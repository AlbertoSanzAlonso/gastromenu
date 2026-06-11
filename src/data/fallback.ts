import type { GalleryCategory, GalleryItem, TeamMember } from '@/lib/supabase/types'

export const fallbackCategories: GalleryCategory[] = [
  {
    id: '1',
    slug: 'cartas',
    title: 'Cartas de menú, vinos, postres y cócteles',
    subtitle: 'Materiales nobles y acabados artesanales',
    sort_order: 1,
    created_at: '',
  },
  {
    id: '2',
    slug: 'manteles',
    title: 'Manteles de papel individuales',
    subtitle: 'Con neuromárketing aplicado',
    sort_order: 2,
    created_at: '',
  },
  {
    id: '3',
    slug: 'portamenus',
    title: 'Portamenú de acero con pantalla flexible',
    subtitle: 'Tecnología e iluminación premium',
    sort_order: 3,
    created_at: '',
  },
  {
    id: '4',
    slug: 'adiciones',
    title: 'Porta adiciones personalizados',
    subtitle: 'Tejido, piel o semipiel en varios colores',
    sort_order: 4,
    created_at: '',
  },
  {
    id: '5',
    slug: 'bajo-platos',
    title: 'Manteles rígidos bajo platos',
    subtitle: 'Alubond lacado a mano al látex',
    sort_order: 5,
    created_at: '',
  },
]

export const fallbackGalleryItems: GalleryItem[] = [
  { id: 'c1', category_id: '1', title: 'Cartas en piel con tornillos vistos', description: null, image_url: null, sort_order: 1, featured: true, created_at: '' },
  { id: 'c2', category_id: '1', title: 'Cartas en semipiel troquel seco', description: null, image_url: null, sort_order: 2, featured: false, created_at: '' },
  { id: 'c3', category_id: '1', title: 'Carta 3D Reserva UVI', description: null, image_url: null, sort_order: 3, featured: true, created_at: '' },
  { id: 'c4', category_id: '1', title: 'Cartas en maderas nobles', description: null, image_url: null, sort_order: 4, featured: false, created_at: '' },
  { id: 'c5', category_id: '1', title: 'Carta en semipiel troquel y stamping oro', description: null, image_url: null, sort_order: 5, featured: true, created_at: '' },
  { id: 'c6', category_id: '1', title: 'Carta de cócteles en policarbonato', description: null, image_url: null, sort_order: 6, featured: false, created_at: '' },
  { id: 'm1', category_id: '2', title: 'Mantel de chiringuito', description: 'Patrocinado', image_url: null, sort_order: 1, featured: true, created_at: '' },
  { id: 'm2', category_id: '2', title: 'Mantel de bar y cafetería', description: null, image_url: null, sort_order: 2, featured: false, created_at: '' },
  { id: 'm3', category_id: '2', title: 'Mantel infantil para colorear', description: null, image_url: null, sort_order: 3, featured: false, created_at: '' },
  { id: 'm4', category_id: '2', title: 'Mantel restaurante mexicano', description: null, image_url: null, sort_order: 4, featured: true, created_at: '' },
  { id: 'p1', category_id: '3', title: 'Elegante curvatura en acero', description: null, image_url: null, sort_order: 1, featured: true, created_at: '' },
  { id: 'p2', category_id: '3', title: 'Portamenú con 3 iluminaciones', description: null, image_url: null, sort_order: 2, featured: true, created_at: '' },
  { id: 'p3', category_id: '3', title: 'Logo soldado a mano', description: null, image_url: null, sort_order: 3, featured: false, created_at: '' },
  { id: 'a1', category_id: '4', title: 'Porta adiciones con logo grabado', description: 'Tejido, piel o semipiel', image_url: null, sort_order: 1, featured: true, created_at: '' },
  { id: 'b1', category_id: '5', title: 'Diseño personalizado, elegante y versátil', description: '3 mm de grosor, robusto y lavable', image_url: null, sort_order: 1, featured: true, created_at: '' },
]

export const fallbackTeam: TeamMember[] = [
  { id: 't1', title: 'Toma de fotografías in situ', description: null, image_url: null, sort_order: 1, created_at: '' },
  { id: 't2', title: 'Toma de fotografías en estudio', description: null, image_url: null, sort_order: 2, created_at: '' },
  { id: 't3', title: 'Control y retoque fotográfico', description: null, image_url: null, sort_order: 3, created_at: '' },
  { id: 't4', title: 'Ajuste de tornillos y acabado artesanal', description: null, image_url: null, sort_order: 4, created_at: '' },
  { id: 't5', title: 'Un gran equipo a su disposición', description: 'Desde 1998 al servicio de la hostelería', image_url: null, sort_order: 5, created_at: '' },
]

export const establishmentTypes = [
  'Franquicias / Cadenas',
  'Restaurante',
  'Pizzería',
  'Cafetería',
  'Bar',
  'Otro',
] as const

export const interestOptions = [
  'Cartas menú (vinos, postres, etc.)',
  'Manteles descartables',
  'Interiorismos / luminosos',
  'Portamenús',
] as const
