import { company, socialLinks } from '../../data/contact'

export const SITE_NAME = 'GASTROMENU'
export const SITE_URL = company.url

export const OG_IMAGE = {
  src: '/og-image.png',
  width: 762,
  height: 1024,
  type: 'image/jpeg',
  alt: 'Cartas artesanales GastroMenu',
} as const

export const homeSeo: SeoCopy = {
  title: 'GASTROMENU — Cartas artesanales premium',
  description:
    'Cartas artesanales, manteles y atriles portamenú. Fabricación propia desde 1998.',
}

export const contactSeo: SeoCopy = {
  title: 'Contacto',
  description:
    'Llámenos al 605 989 264 o escríbanos a info@cartasmenu.com. Oficina en Benalmádena Pueblo, Málaga. Talleres en Madrid, Málaga y Granada.',
}

export const legalNoticeSeo: SeoCopy = {
  title: 'Aviso legal',
  description:
    'Datos identificativos, condiciones de uso y propiedad intelectual del sitio de GastroMenu, titularidad de Fudys Gourmet SL.',
}

export const privacySeo: SeoCopy = {
  title: 'Política de privacidad',
  description:
    'Información sobre el tratamiento de datos personales de GastroMenu, titularidad de Fudys Gourmet SL, conforme al RGPD y la LOPDGDD.',
}

export const dossierSeo = {
  nosotros: {
    path: '/nosotros',
    title: 'Nosotros',
    description:
      'GastroMenú Premium. Más de 28 años convirtiendo la presentación en parte de la experiencia. Cartas, manteles y atriles portamenú.',
  },
  cartas: {
    path: '/cartas',
    title: 'Cartas menú',
    description:
      'Cartas de menú, vinos, postres y cócteles en tapas duras, piel, semipiel, tejidos nobles y maderas selectas. Fabricación artesanal GastroMenú Premium.',
  },
  atriles: {
    path: '/atriles',
    title: 'Atriles portamenú',
    description:
      'Atriles portamenú de acero, de pie, cilíndricos y de pared. Pantalla retroiluminada, batería o conexión eléctrica, corte láser y pintura al horno.',
  },
  manteles: {
    path: '/manteles',
    title: 'Manteles',
    description:
      'Manteles de papel de un solo uso y manteles rígidos lacados a mano. Diseño personalizado, neuromárketing y papeles de 90 gramos.',
  },
  exclusividades: {
    path: '/exclusividades',
    title: 'Exclusividades',
    description:
      'Portacuentas artesanales en tejido y semipiel, con el logo del restaurante. Un toque de clase para presentar la cuenta.',
  },
  blog: {
    path: '/blog',
    title: 'Blog',
    description:
      'Comentarios, sugerencias y consejos de GastroMenú Premium sobre cartas, portamenús y manteles. Los artículos irán llegando a esta sección.',
  },
} satisfies Record<string, SeoCopy & { path: string }>

interface SeoCopy {
  title: string
  description: string
}

export type SeoLocale = 'es' | 'en'
export type ChangeFreq = 'weekly' | 'monthly' | 'yearly'

export interface PublicPage {
  path: string
  title: string
  description: string
  changefreq: ChangeFreq
  priority: string
  /** Carpetas dentro de public/ cuyas imágenes entran en el sitemap. */
  imageDirs: readonly string[]
}

export const publicPages: readonly PublicPage[] = [
  {
    path: '/',
    title: homeSeo.title,
    description: homeSeo.description,
    changefreq: 'weekly',
    priority: '1.0',
    imageDirs: ['images/web/inicio', 'images/hero'],
  },
  {
    path: dossierSeo.nosotros.path,
    title: dossierSeo.nosotros.title,
    description: dossierSeo.nosotros.description,
    changefreq: 'monthly',
    priority: '0.8',
    imageDirs: ['images/web/nosotros'],
  },
  {
    path: dossierSeo.cartas.path,
    title: dossierSeo.cartas.title,
    description: dossierSeo.cartas.description,
    changefreq: 'monthly',
    priority: '0.9',
    imageDirs: ['images/web/cartas'],
  },
  {
    path: dossierSeo.atriles.path,
    title: dossierSeo.atriles.title,
    description: dossierSeo.atriles.description,
    changefreq: 'monthly',
    priority: '0.9',
    imageDirs: ['images/web/atriles'],
  },
  {
    path: dossierSeo.manteles.path,
    title: dossierSeo.manteles.title,
    description: dossierSeo.manteles.description,
    changefreq: 'monthly',
    priority: '0.9',
    imageDirs: ['images/web/manteles'],
  },
  {
    path: dossierSeo.exclusividades.path,
    title: dossierSeo.exclusividades.title,
    description: dossierSeo.exclusividades.description,
    changefreq: 'monthly',
    priority: '0.8',
    imageDirs: ['images/web/exclusividades'],
  },
  {
    path: dossierSeo.blog.path,
    title: dossierSeo.blog.title,
    description: dossierSeo.blog.description,
    changefreq: 'weekly',
    priority: '0.6',
    imageDirs: [],
  },
  {
    path: '/contacto',
    title: contactSeo.title,
    description: contactSeo.description,
    changefreq: 'monthly',
    priority: '0.7',
    imageDirs: [],
  },
  {
    path: '/aviso-legal',
    title: legalNoticeSeo.title,
    description: legalNoticeSeo.description,
    changefreq: 'yearly',
    priority: '0.3',
    imageDirs: [],
  },
  {
    path: '/privacidad',
    title: privacySeo.title,
    description: privacySeo.description,
    changefreq: 'yearly',
    priority: '0.3',
    imageDirs: [],
  },
]

/** Rutas del backoffice. No entran en el sitemap y se publican con noindex. */
export const privatePaths = [
  '/admin',
  '/admin/contenido',
  '/admin/galeria',
  '/admin/equipo',
  '/admin/consultas',
] as const

const BUSINESS_ID = `${SITE_URL}/#business`
const WEBSITE_ID = `${SITE_URL}/#website`

export function documentTitle(title: string) {
  if (
    title === SITE_NAME ||
    title.startsWith(`${SITE_NAME} `) ||
    title.startsWith(`${SITE_NAME} —`) ||
    title.startsWith(`${SITE_NAME}—`)
  ) {
    return title
  }
  return `${title} | ${SITE_NAME}`
}

export function pageUrl(path: string) {
  if (path === '/') return `${SITE_URL}/`
  return `${SITE_URL}${path}`
}

export function buildJsonLd(input: {
  path: string
  title: string
  crumb: string
  description: string
  locale: SeoLocale
}) {
  const url = pageUrl(input.path)
  const language = input.locale === 'en' ? 'en' : 'es'
  const homeLabel = input.locale === 'en' ? 'Home' : 'Inicio'
  const sameAs = socialLinks.map((link) => link.href).filter((href) => href.length > 0)
  const pageType =
    input.path === '/contacto' ? 'ContactPage' : input.path === '/blog' ? 'Blog' : 'WebPage'

  const business = {
    '@type': ['LocalBusiness', 'Manufacturer'],
    '@id': BUSINESS_ID,
    name: SITE_NAME,
    alternateName: ['GastroMenú', 'GastroMenú Premium'],
    legalName: company.legalName,
    taxID: company.cif,
    url: SITE_URL,
    slogan: 'Cartas artesanales premium para el alma de tu negocio.',
    description: homeSeo.description,
    foundingDate: '1998',
    image: `${SITE_URL}${OG_IMAGE.src}`,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo-mark.svg`,
    },
    email: company.email,
    telephone: company.phones.map((phone) => phone.tel),
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.office.street,
      postalCode: '29639',
      addressLocality: 'Benalmádena',
      addressRegion: 'Málaga',
      addressCountry: 'ES',
    },
    hasMap: company.office.maps,
    areaServed: {
      '@type': 'Country',
      name: 'España',
    },
    knowsLanguage: ['es', 'en'],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '15:00',
    },
    contactPoint: company.phones.map((phone) => ({
      '@type': 'ContactPoint',
      telephone: phone.tel,
      email: company.email,
      contactType: 'customer service',
      availableLanguage: ['Spanish', 'English'],
      areaServed: 'ES',
    })),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  }

  const website = {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    description: homeSeo.description,
    inLanguage: ['es', 'en'],
    publisher: { '@id': BUSINESS_ID },
  }

  const webPage: Record<string, unknown> = {
    '@type': pageType,
    '@id': `${url}#webpage`,
    url,
    name: input.title,
    description: input.description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': BUSINESS_ID },
    inLanguage: language,
    image: `${SITE_URL}${OG_IMAGE.src}`,
  }

  if (input.path === '/contacto') {
    webPage.mainEntity = { '@id': BUSINESS_ID }
  }

  const graph: Record<string, unknown>[] = [business, website, webPage]

  if (input.path !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: homeLabel,
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: input.crumb,
          item: url,
        },
      ],
    })
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}
