import type { DossierPageContent } from '@/data/dossierTypes'

export const exclusividadesPage: DossierPageContent = {
  path: '/exclusividades',
  seoTitle: 'Exclusividades',
  seoDescription:
    'Porta cuentas y porta adiciones artesanales en tejido, semipiel y piel. Un detalle de alta calidad para llevar la cuenta a la mesa.',
  kicker: 'Exclusividades',
  title: 'El último gesto de la mesa, también se',
  emphasis: 'diseña',
  lead:
    'Fabricamos porta cuentas para que llevar la cuenta a la mesa sea un gesto diferenciado: una pieza de alta calidad, no un sobre improvisado. Tejido especial, semipiel o piel, con el logo del restaurante.',
  sections: [
    {
      id: 'porta-cuentas',
      nav: 'Porta cuentas',
      kicker: 'Porta cuentas y porta adiciones',
      title: 'Un toque de',
      emphasis: 'clase',
      paragraphs: [
        'El acto de llevar la cuenta puede ser tan cuidado como el resto del servicio. Elaboramos porta cuentas en tejido especial y en distintas tonalidades, y también en semipiel, con huecograbado, troquel o grabado del logotipo en ambas caras.',
        'El bolsillo interior guarda la cuenta, la tarjeta del establecimiento o la adición. En varios materiales y colores: tejidos, piel, semipiel o gráficos grabados y estampados en oro o plata.',
        'Es una pieza pequeña y se nota. Cierra la experiencia con el mismo criterio con el que se abrió la carta.',
      ],
      highlights: [
        'Tejido especial en distintas tonalidades',
        'Semipiel con huecograbado',
        'Logo troquelado o grabado en ambas caras',
        'Bolsillo interior para la cuenta o la tarjeta',
        'Estampación en oro o plata',
      ],
      images: [
        { file: '01-las-brasas-cerrado-premium.webp', caption: 'Las Brasas', src: '/images/web/exclusividades/01-las-brasas-cerrado-premium.webp' },
        { file: '02-las-brasas-abierto-premium.webp', caption: 'Las Brasas, abierto', src: '/images/web/exclusividades/02-las-brasas-abierto-premium.webp' },
        { file: '03-the-view-abierto-premium.webp', caption: 'The View', src: '/images/web/exclusividades/03-the-view-abierto-premium.webp' },
      ],
      variant: 'light',
    },
  ],
}
