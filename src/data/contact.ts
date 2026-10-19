export const company = {
  legalName: 'Fudys Gourmet SL',
  cif: 'B06899389',
  email: 'info@cartasmenu.com',
  hours: 'Lunes a viernes, de 09:00 a 15:00 h.',
  callLabel: 'Llámenos',
  callBody:
    'O escríbanos para indicarnos sus necesidades. Nos pondremos en contacto lo antes posible.',
  phones: [
    { display: '605 989 264', tel: '+34605989264' },
    { display: '951 62 22 57', tel: '+34951622257' },
  ],
  office: {
    label: 'Oficina comercial',
    street: 'Av. de los Botijos, 5-13',
    city: '29639 Benalmádena Pueblo, Málaga',
    maps: 'https://www.google.com/maps/search/?api=1&query=Av.+de+los+Botijos+5-13,+29639+Benalm%C3%A1dena',
  },
  workshops: {
    label: 'Talleres e impresión',
    places: ['Madrid', 'Málaga', 'Granada'],
  },
} as const

export const footerNav = [
  { to: '/', label: 'Inicio' },
  { to: '/nosotros', label: 'Qué hacemos' },
  { to: '/cartas', label: 'Cartas menú' },
  { to: '/manteles', label: 'Manteles de papel' },
  { to: '/atriles', label: 'Portamenús' },
  { to: '/exclusividades', label: 'Otros servicios' },
  { to: '/contacto', label: 'Contacto' },
] as const

/** Las redes sin URL pública se muestran, pero no enlazan hasta tener el perfil. */
export const socialLinks = [
  { id: 'facebook', label: 'Facebook', href: '' },
  { id: 'youtube', label: 'YouTube', href: '' },
  { id: 'linkedin', label: 'LinkedIn', href: '' },
  { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/34605989264' },
  { id: 'pinterest', label: 'Pinterest', href: '' },
] as const

export type SocialId = (typeof socialLinks)[number]['id']
