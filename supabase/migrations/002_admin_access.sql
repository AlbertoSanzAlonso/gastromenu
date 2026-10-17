-- Acceso de escritura para el backoffice (/admin).
-- Cualquier usuario autenticado de Supabase puede editar el contenido.
-- Desactiva el registro público en Authentication y crea el usuario a mano.

create policy "Admin gestiona categorías"
on gallery_categories
for all
to authenticated
using (true)
with check (true);

create policy "Admin gestiona piezas"
on gallery_items
for all
to authenticated
using (true)
with check (true);

create policy "Admin gestiona equipo"
on team_members
for all
to authenticated
using (true)
with check (true);

create policy "Admin gestiona contenido"
on site_content
for all
to authenticated
using (true)
with check (true);

create policy "Admin lee consultas"
on contact_inquiries
for select
to authenticated
using (true);

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "Lectura pública de medios"
on storage.objects
for select
using (bucket_id = 'media');

create policy "Admin sube medios"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'media');

create policy "Admin actualiza medios"
on storage.objects
for update
to authenticated
using (bucket_id = 'media');

create policy "Admin elimina medios"
on storage.objects
for delete
to authenticated
using (bucket_id = 'media');
