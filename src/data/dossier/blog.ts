import type { DossierPageContent } from '@/data/dossierTypes'
import { dossierSeo } from '@/lib/seo/site'

export const blogPage: DossierPageContent = {
  path: dossierSeo.blog.path,
  seoTitle: dossierSeo.blog.title,
  seoDescription: dossierSeo.blog.description,
  kicker: 'Blog',
  title: 'Comentarios, sugerencias y',
  emphasis: 'consejos',
  lead:
    'Comentarios, sugerencias y consejos para la elaboración de cartas, el cuidado de los materiales, la elección de portamenús y el diseño de los manteles. Los textos de cada artículo irán publicándose aquí.',
  sections: [
    {
      id: 'elaboracion',
      nav: 'Elaboración',
      kicker: 'Próximamente',
      title: 'Elaboración de',
      emphasis: 'cartas',
      paragraphs: [
        'Comentarios, sugerencias y consejos para la elaboración de cartas.',
      ],
      images: [],
      variant: 'light',
    },
    {
      id: 'cuidado',
      nav: 'Cuidado',
      kicker: 'Próximamente',
      title: 'Cuidados y',
      emphasis: 'mantenimiento',
      paragraphs: [
        'Sugerencias para cuidados y mantenimientos de cartas para ampliar su durabilidad.',
      ],
      images: [],
      variant: 'light',
    },
    {
      id: 'portamenu',
      nav: 'Portamenú',
      kicker: 'Próximamente',
      title: 'Elección de',
      emphasis: 'portamenús',
      paragraphs: [
        'Comentarios sobre portamenús y ayudas para la mejor elección de equipos y mantenimiento de los mismos.',
      ],
      images: [],
      variant: 'light',
    },
    {
      id: 'neuromarketing',
      nav: 'Neuromárketing',
      kicker: 'Próximamente',
      title: 'Diseño de los',
      emphasis: 'mensajes',
      paragraphs: [
        'Asesoramiento para el diseño de sus mensajes utilizando neuromárketing.',
      ],
      images: [],
      variant: 'light',
    },
    {
      id: 'diseno-manteles',
      nav: 'Manteles',
      kicker: 'Próximamente',
      title: 'Diseño de los',
      emphasis: 'manteles',
      paragraphs: [
        'Recomendaciones para el diseño más efectivo de los manteles.',
      ],
      images: [],
      variant: 'light',
    },
  ],
}
