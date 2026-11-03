import type { DossierPageContent } from '@/data/dossierTypes'

export const exclusividadesPage: DossierPageContent = {
  path: '/exclusividades',
  seoTitle: 'Exclusividades',
  seoDescription:
    'Portacuentas artesanales en tejido y semipiel, con el logo del restaurante. Un toque de clase para presentar la cuenta.',
  kicker: 'Exclusividades',
  title: 'Un toque de',
  emphasis: 'clase',
  lead:
    'Fabricamos prácticos porta cuentas, para que el acto de llevar la cuenta a una mesa sea diferenciado con un producto de alta calidad. Una atractiva experiencia y un toque de clase en la mesa, con bolsillo interior para llevar la tarjeta de su establecimiento.',
  sections: [
    {
      id: 'porta-cuentas',
      nav: 'Porta cuentas',
      kicker: 'Portacuentas',
      title: 'Un toque de',
      emphasis: 'clase',
      paragraphs: [
        'Cuando llega la hora de presentar la cuenta a sus clientes, que mejor que realizarlo en un envoltorio elegante, fino y delicado, a la vez que práctico y duradero.',
        'Le presentamos un portacuentas totalmente personalizado, para que sus comensales finalicen la experiencia de haberse sentido bien atendidos, bien comidos y con una excelente sensación interior. La cuenta, dentro de un portacuentas de tejido o en semipiel, con su logo grabado en la portada y por dentro, cuando su cliente lo abra, una inscripción agradeciéndole su visita, acompañado de una tarjeta de su establecimiento para invitarle a retornar pronto. Qué mejor despedida?…',
        'En GastroMenú Premium los elaboramos a mano, como todo lo que hacemos y en varias tonalidades de color y personalización de su logo. Pregunte por ellos y agregue un toque de clase adicional a la colección de sus nuevas cartas.',
      ],
      highlights: [
        'Grabado o troquel del logo en ambas caras',
        'Semipiel de varias tonalidades, con huecograbado',
        'Tejido especial, en diferentes colores',
        'Bolsillo interior para la cuenta o la tarjeta',
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
