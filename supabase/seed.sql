-- Datos iniciales para GastroMenúPremium

insert into gallery_categories (slug, title, subtitle, sort_order) values
  ('cartas', 'Cartas de menú, vinos, postres y cócteles', 'Materiales nobles y acabados artesanales', 1),
  ('manteles', 'Manteles de papel individuales', 'Con neuromárketing aplicado', 2),
  ('portamenus', 'Portamenú de acero con pantalla flexible', 'Tecnología e iluminación premium', 3),
  ('adiciones', 'Porta adiciones personalizados', 'Tejido, piel o semipiel en varios colores', 4),
  ('bajo-platos', 'Manteles rígidos bajo platos', 'Alubond lacado a mano al látex', 5)
on conflict (slug) do nothing;

insert into team_members (title, description, sort_order) values
  ('Toma de fotografías in situ', null, 1),
  ('Toma de fotografías en estudio', null, 2),
  ('Control y retoque fotográfico', null, 3),
  ('Ajuste de tornillos y acabado artesanal', null, 4),
  ('Un gran equipo a su disposición', 'Desde 1998 al servicio de la hostelería', 5);

insert into site_content (key, value) values
  ('hero_image', '/images/hero-ref-01.webp'),
  ('hero_title', E'La excelencia\ncomo destino'),
  ('hero_quote', 'A veces una primera impresión es la que queda para siempre…'),
  ('about_text', E'Llevamos 28 años diseñando y fabricando cartas de menú, manteles personalizados y atriles portamenú para restaurantes que entienden que cada detalle cuenta.\n\nCombinamos la artesanía tradicional con la innovación del sector premium: diseños personalizados, materiales nobles y un marketing gastronómico que interpreta sus deseos.')
on conflict (key) do nothing;
