CREATE TABLE IF NOT EXISTS pages (
  slug TEXT PRIMARY KEY,
  path TEXT NOT NULL,
  seo_title TEXT NOT NULL,
  seo_description TEXT NOT NULL,
  kicker TEXT NOT NULL,
  title TEXT NOT NULL,
  emphasis TEXT,
  lead TEXT NOT NULL,
  sort_order INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS sections (
  id TEXT PRIMARY KEY,
  page_slug TEXT NOT NULL,
  section_key TEXT NOT NULL,
  nav TEXT NOT NULL,
  kicker TEXT NOT NULL,
  title TEXT NOT NULL,
  emphasis TEXT,
  variant TEXT NOT NULL CHECK (variant IN ('light', 'dark', 'beige')),
  sort_order INTEGER NOT NULL,
  FOREIGN KEY (page_slug) REFERENCES pages (slug)
);

CREATE TABLE IF NOT EXISTS section_paragraphs (
  section_id TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  body TEXT NOT NULL,
  PRIMARY KEY (section_id, sort_order),
  FOREIGN KEY (section_id) REFERENCES sections (id)
);

CREATE TABLE IF NOT EXISTS section_highlights (
  section_id TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  body TEXT NOT NULL,
  PRIMARY KEY (section_id, sort_order),
  FOREIGN KEY (section_id) REFERENCES sections (id)
);

CREATE TABLE IF NOT EXISTS section_images (
  section_id TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  r2_key TEXT NOT NULL,
  caption TEXT NOT NULL,
  PRIMARY KEY (section_id, sort_order),
  FOREIGN KEY (section_id) REFERENCES sections (id)
);

CREATE INDEX IF NOT EXISTS idx_sections_page ON sections (page_slug, sort_order);
