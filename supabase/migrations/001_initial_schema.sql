-- GastroMenúPremium — Esquema inicial
-- Ejecutar en Supabase SQL Editor o con supabase db push

create extension if not exists "uuid-ossp";

-- Categorías de galería
create table if not exists gallery_categories (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  subtitle text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Items de galería
create table if not exists gallery_items (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid not null references gallery_categories(id) on delete cascade,
  title text not null,
  description text,
  image_url text,
  sort_order int not null default 0,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

-- Equipo / servicios
create table if not exists team_members (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Consultas de contacto
create table if not exists contact_inquiries (
  id uuid primary key default uuid_generate_v4(),
  establishment_name text not null,
  establishment_type text not null,
  contact_first_name text not null,
  contact_last_name text not null,
  phone text not null,
  address text,
  email text not null,
  interests text[] not null default '{}',
  message text,
  privacy_accepted boolean not null default false,
  created_at timestamptz not null default now()
);

-- Contenido editable del sitio
create table if not exists site_content (
  id uuid primary key default uuid_generate_v4(),
  key text unique not null,
  value text not null,
  updated_at timestamptz not null default now()
);

-- Índices
create index if not exists idx_gallery_items_category on gallery_items(category_id);
create index if not exists idx_gallery_items_featured on gallery_items(featured) where featured = true;

-- RLS
alter table gallery_categories enable row level security;
alter table gallery_items enable row level security;
alter table team_members enable row level security;
alter table contact_inquiries enable row level security;
alter table site_content enable row level security;

-- Lectura pública
create policy "Lectura pública categorías" on gallery_categories for select using (true);
create policy "Lectura pública items" on gallery_items for select using (true);
create policy "Lectura pública equipo" on team_members for select using (true);
create policy "Lectura pública contenido" on site_content for select using (true);

-- Inserción de contacto (anónimo)
create policy "Insertar consultas" on contact_inquiries for insert with check (privacy_accepted = true);
