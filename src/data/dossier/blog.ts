import type { DossierPageContent } from '@/data/dossierTypes'

export const blogPage: DossierPageContent = {
  path: '/blog',
  seoTitle: 'Blog',
  seoDescription:
    'Consejos de GastroMenú Premium sobre cartas, portamenús y manteles. Los artículos irán publicándose en esta sección.',
  kicker: 'Blog',
  title: 'Notas para servir mejor la',
  emphasis: 'experiencia',
  lead:
    'Aquí publicaremos comentarios, sugerencias y consejos sobre la elaboración de cartas, el cuidado de los materiales y la elección de portamenús y manteles. Los textos irán llegando poco a poco.',
  sections: [
    {
      id: 'elaboracion',
      nav: 'Elaboración',
      kicker: 'Próximamente',
      title: 'Elaboración de cartas',
      paragraphs: [
        'Comentarios, sugerencias y criterios para componer una carta que se lea y que venda.',
      ],
      images: [],
      variant: 'light',
    },
    {
      id: 'cuidado',
      nav: 'Cuidado',
      kicker: 'Próximamente',
      title: 'Cuidado y mantenimiento',
      paragraphs: [
        'Cómo ampliar la durabilidad de las cartas y conservar el acabado con el uso de sala.',
      ],
      images: [],
      variant: 'light',
    },
    {
      id: 'portamenu',
      nav: 'Portamenú',
      kicker: 'Próximamente',
      title: 'Elegir un portamenú',
      paragraphs: [
        'Ayudas para escoger el equipo, la iluminación y el mantenimiento que el local necesita.',
      ],
      images: [],
      variant: 'light',
    },
    {
      id: 'neuromarketing',
      nav: 'Neuromarketing',
      kicker: 'Próximamente',
      title: 'Neuromarketing en la mesa',
      paragraphs: [
        'Cómo ordenar los mensajes para que la mirada llegue al plato que más interesa servir.',
      ],
      images: [],
      variant: 'light',
    },
    {
      id: 'diseno-manteles',
      nav: 'Manteles',
      kicker: 'Próximamente',
      title: 'Diseño de manteles',
      paragraphs: [
        'Recomendaciones para que el mantel informe, sugiera y forme parte de la imagen del local.',
      ],
      images: [],
      variant: 'light',
    },
  ],
}
