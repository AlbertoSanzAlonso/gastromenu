import type { DossierPageContent } from '@/data/dossierTypes'

export const nosotrosPage: DossierPageContent = {
  path: '/nosotros',
  seoTitle: 'Nosotros',
  seoDescription:
    'GastroMenú Premium: 28 años diseñando y fabricando cartas, manteles y atriles portamenú para el sector gastronómico.',
  kicker: 'Nosotros',
  title: 'La presentación también forma parte de la',
  emphasis: 'experiencia',
  lead:
    'Llevamos 28 años trabajando para restaurantes que entienden que cada detalle cuenta. Diseñamos y fabricamos cartas de menú, manteles personalizados y atriles portamenú de acero: artesanía tradicional e innovación para el sector premium.',
  sections: [
    {
      id: 'historia',
      nav: 'Historia',
      kicker: 'Desde 1998',
      title: 'Interpretamos sus deseos y los hacemos',
      emphasis: 'nuestros',
      paragraphs: [
        'Cada proyecto nace de una idea: que la imagen del restaurante empiece antes de que el cliente se siente a la mesa. No partimos de un catálogo cerrado. Escuchamos el local, su cocina y lo que quiere transmitir.',
        'Trabajamos piel, semipiel, tejidos nobles, maderas selectas, tapas rígidas, alubond y acero. El diseño es personalizado y la fabricación, artesanal: uno a uno, con la calma de quien sabe que la carta se toca, se mira y se recuerda.',
      ],
      highlights: [
        '28 años de experiencia en el sector',
        'Diseños personalizados, no soluciones estándar',
        'Marketing gastronómico aplicado a la mesa',
        'Calidad, durabilidad y atención directa',
      ],
      images: [
        { file: 'PORTADA CARTA MARGARITA.png', caption: 'Carta en tapas duras' },
        { file: 'TRILOGÍA THE CATCH - BUENA -.png', caption: 'Colección en trilogía' },
        { file: 'CARTA DE VINOS CERVANTES. PIEL.PORTADA.png', caption: 'Piel auténtica' },
        { file: 'FACHADA ALTANOUR CON PORTAMENÚ.png', caption: 'Atril en fachada' },
      ],
      variant: 'light',
    },
    {
      id: 'oficio',
      nav: 'Oficio',
      kicker: 'Cómo trabajamos',
      title: 'Del concepto a la pieza que llega a la',
      emphasis: 'mesa',
      paragraphs: [
        'Además de fabricar, acompañamos el contenido: fotografías técnicas, inserción de alérgenos, banco de imágenes gastronómicas, traducciones profesionales a varios idiomas y asesoramiento de diseño.',
        'El armado se hace a mano. Tornillos, esquineros, stamping, troquel y reserva UVI se resuelven en el taller, con materiales elegidos para durar y un acabado que el comensal nota al primer contacto.',
      ],
      highlights: [
        'Fotografías técnicas e inserción de alérgenos',
        'Banco de imágenes gastronómicas',
        'Traducciones profesionales',
        'Asesoramiento de diseño y neuromarketing',
      ],
      images: [
        { file: 'ARMADO-A-MANO-WEB.png', caption: 'Armado a mano' },
        { file: 'DETALLE  ESTAMPACIÓN ORO.png', caption: 'Estampación en oro' },
        { file: 'DETALLE DE GRABADO CARTA DE VINOS EL GREEK.png', caption: 'Grabado en piel' },
        { file: 'ARMADO-CARTAS-ARMADO-FINAL-150x150.png', caption: 'Acabado final' },
      ],
      variant: 'beige',
    },
    {
      id: 'agencias',
      nav: 'Agencias',
      kicker: 'Agencias y diseñadores',
      title: 'Usted diseña. Nosotros lo',
      emphasis: 'fabricamos',
      paragraphs: [
        'Trabajamos con agencias de publicidad, estudios creativos y diseñadores gráficos que necesitan convertir una carta, un mantel o un portamenú en un producto real, fiel al diseño aprobado.',
        'Respetamos la identidad visual, las medidas, los materiales y los acabados definidos en el proyecto. Piel, semipiel, tejidos, maderas, tapas rígidas u otros soportes, con las texturas, los colores y el sistema de fabricación que la pieza pide.',
        'El resultado es un producto desarrollado para su cliente, con su diseño y con el cuidado de una fabricación premium. Condiciones pensadas para que pueda presentarlo con una solución personalizada y competitiva.',
      ],
      highlights: [
        'Cartas menú a partir de su diseño',
        'Atriles portamenú, también iluminados',
        'Mantelería rígida y de un solo uso',
        'Fabricación personalizada, pieza a pieza',
      ],
      images: [
        { file: 'PORTADA-ORIENT-EXPRESS (10-100).png', caption: 'Diseño de autor' },
        { file: 'CARTA TROQUELADA MENU HARUKI (RECORTADA).png', caption: 'Troquel y grabado' },
        { file: 'CARTAS EN TELA DIFERENTES ESTAMPADOS.png', caption: 'Tejidos nobles' },
        { file: 'EXTERIOR-CARTA-MADERA-KOCO.png', caption: 'Madera selecta' },
      ],
      variant: 'dark',
    },
    {
      id: 'clientes',
      nav: 'Clientes',
      kicker: 'Quienes ya sirven con nosotros',
      title: 'Nada mejor que ver la cara de felicidad de un cliente',
      emphasis: 'satisfecho',
      paragraphs: [
        'El orgullo interior y el placer de saber que hemos cumplido se notan cuando el restaurador recibe sus cartas o sus manteles y los pone en la mesa. Muchos vuelven. Otros nos confiesan, después de haberlos estrenado, que sus clientes lo han notado.',
        'No se trata solo de la calidad de los comensales cuando levantan la nueva carta. Se trata de la confianza de que el cliente no tendrá que preguntar por un plato: ya hay un lenguaje que le da ganas de pedirlo.',
      ],
      images: [
        { file: 'OK DUEÑO CARTA.png', caption: 'La carta, en sus manos' },
        { file: 'OK DUEÑO _ALTANOUR_.png', caption: 'Altanour' },
        { file: 'DUEÑA MI CAFÉ OK.png', caption: 'Mi Café' },
        { file: 'CLIENTE KARNIVORO OK.png', caption: 'Karnivoro' },
      ],
      variant: 'light',
    },
  ],
}
