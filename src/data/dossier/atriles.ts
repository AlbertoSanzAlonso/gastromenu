import type { DossierPageContent } from '@/data/dossierTypes'

export const atrilesPage: DossierPageContent = {
  path: '/atriles',
  seoTitle: 'Atriles portamenú',
  seoDescription:
    'Atriles portamenú de acero, de pie o de pared, con pantalla retroiluminada, batería o conexión eléctrica. Diseño artesanal GastroMenú Premium.',
  kicker: 'Atriles portamenú',
  title: 'La oferta, antes de cruzar la',
  emphasis: 'puerta',
  lead:
    'Innovación y diseño en equipos que atraen al público directamente a la entrada del establecimiento. Acero trabajado de forma artesanal, corte láser, pintura al horno y una gráfica que se cambia con facilidad. De pie o de pared, eléctricos o autónomos con batería.',
  sections: [
    {
      id: 'de-pie',
      nav: 'De pie',
      kicker: 'Modelo rígido',
      title: 'Simplemente',
      emphasis: 'espectacular',
      paragraphs: [
        'Un atril de pie para colocar a la puerta del local: estructura de acero, pantalla LED retroiluminada y una presencia que se entiende desde la acera. Sirve de día y de noche, en interior o a la intemperie.',
        'La gráfica se sustituye sin rehacer el equipo. Puede funcionar sin iluminación en horario diurno, conectado a la red o en autonomía con la batería integrada.',
      ],
      highlights: [
        'Alto aproximado 163 cm, ancho 65 cm y fondo 55 cm',
        'Pantalla LED retroiluminada',
        'Batería integrada y cuatro ruedas con freno',
        'Uso exterior, resistente a la intemperie',
        'Sin iluminación, eléctrico o autónomo',
      ],
      images: [
        { file: '01-atril-de-pie-altanour-premium.webp', caption: 'Altanour', src: '/images/web/atriles/01-atril-de-pie-altanour-premium.webp' },
      ],
      variant: 'light',
    },
    {
      id: 'cilindrico',
      nav: 'Cilíndrico',
      kicker: 'Modelo de pie',
      title: 'Con clase y',
      emphasis: 'elegancia',
      paragraphs: [
        'Un atril de líneas más finas, con pantalla ultra delgada y un pilar de acero galvanizado. El nombre del establecimiento puede ir cortado a láser y retroiluminado sobre el propio pilar: el equipo presenta el local antes incluso de leer la carta.',
        'La base es sólida, con ruedas silenciosas y autoblocantes. Se fabrica en el estilo del proyecto y admite mantenimiento y cambio de pantalla cuando la oferta lo pide.',
      ],
      highlights: [
        'Pantalla de 50 × 40 cm',
        'Pilar de acero galvanizado, corte láser retroiluminado',
        'Base estable y ruedas autoblocantes',
        'Iluminación eléctrica, autónoma o apagada de día',
      ],
      images: [
        { file: '02-atril-cilindrico-premium.webp', caption: 'Modelo cilíndrico', src: '/images/web/atriles/02-atril-cilindrico-premium.webp' },
      ],
      variant: 'beige',
    },
    {
      id: 'pared',
      nav: 'De pared',
      kicker: 'Cartel retroiluminado',
      title: 'No pasa',
      emphasis: 'desapercibido',
      paragraphs: [
        'El portamenú de pared se corta a láser, se personaliza con la identidad del local y se retroilumina para que la oferta se lea desde la entrada. El marco, el fondo y la gráfica se estudian para ese establecimiento, no para un modelo genérico.',
        'Puede ir conectado a la red o con batería. La referencia del croquis —como en el cartel Río Bravo— marca un formato amplio, de poca profundidad, pensado para fachada.',
      ],
      highlights: [
        'Referencia de croquis: 150 cm de ancho y 70 cm de alto',
        'Profundidad de 20 mm con electricidad y 40 mm con batería',
        'Acero, corte láser y retroiluminación',
        'Gráfica sustituible',
      ],
      images: [
        { file: '03-atril-pared-rio-bravo-premium.webp', caption: 'Río Bravo', src: '/images/web/atriles/03-atril-pared-rio-bravo-premium.webp' },
      ],
      variant: 'dark',
    },
    {
      id: 'pantallas',
      nav: 'Pantallas',
      kicker: 'Formatos amplios',
      title: 'Amplia pantalla, de alto',
      emphasis: 'brillo',
      paragraphs: [
        'Cuando la oferta necesita más superficie, fabricamos pantallas amplias y vitrinas de aluminio, de pie o integradas en la fachada. El contenido se lee de un vistazo y se cambia sin desmontar el equipo.',
        'En terraza, en el acceso o junto a la barra: el portamenú trabaja aunque el comensal todavía no haya entrado.',
      ],
      highlights: [
        'Pantalla de 70 × 50 cm',
        'Vitrinas de aluminio',
        'Modelos de exterior para terraza y fachada',
      ],
      images: [
        { file: '04-atril-pantalla-ancha-premium.webp', caption: 'Pantalla ancha', src: '/images/web/atriles/04-atril-pantalla-ancha-premium.webp' },
      ],
      variant: 'light',
    },
    {
      id: 'outlet',
      nav: 'Outlet',
      kicker: 'Por tiempo limitado',
      title: 'Oportunidades, por poco',
      emphasis: 'tiempo',
      paragraphs: [
        'Disponemos de un pequeño stock de atriles portamenú por liquidación o cambio de modelo. Equipos nuevos y otros de exposición: vitrinas de aluminio con cerradura, reciclados, pintados y preparados, con la gráfica de su carta.',
        'No hay mucho. En algunos modelos quedan una o dos unidades; en otros, no más de diez. Conviene preguntar antes: el stock se mueve y estas condiciones duran lo que dura la existencia.',
      ],
      images: [],
      variant: 'beige',
    },
  ],
}
