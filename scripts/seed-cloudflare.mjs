import { spawnSync } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const remote = process.argv.includes('--remote')
const imagesDir = path.join(root, 'public', 'dossier')
const migrationPath = path.join(root, 'migrations', '0001_content.sql')
const seedPath = path.join(root, 'cloudflare', '.seed.sql')
const wranglerBin = path.join(root, 'node_modules', '.bin', 'wrangler')

function sqlString(value) {
  if (value == null || value === '') return 'NULL'
  return `'${String(value).replaceAll("'", "''")}'`
}

function contentTypeFor(fileName) {
  const extension = path.extname(fileName).toLowerCase()
  if (extension === '.png') return 'image/png'
  if (extension === '.jpg' || extension === '.jpeg') return 'image/jpeg'
  if (extension === '.webp') return 'image/webp'
  if (extension === '.gif') return 'image/gif'
  return 'application/octet-stream'
}

function sqlScript(source) {
  return source
    .split(/;\s*(?:\n|$)/)
    .map((statement) => statement.replace(/\s+/g, ' ').trim())
    .filter((statement) => statement.length > 0 && !statement.startsWith('--'))
}

function statementGroups(statements, maxBytes = 70_000) {
  const groups = []
  let current = []
  let size = 0

  for (const statement of statements) {
    const bytes = Buffer.byteLength(statement) + 2
    if (current.length > 0 && size + bytes > maxBytes) {
      groups.push(current)
      current = []
      size = 0
    }
    current.push(statement)
    size += bytes
  }

  if (current.length > 0) groups.push(current)
  return groups
}

function buildStatements(pages) {
  const statements = [
    'DELETE FROM section_images',
    'DELETE FROM section_highlights',
    'DELETE FROM section_paragraphs',
    'DELETE FROM sections',
    'DELETE FROM pages',
  ]
  const files = new Set()

  pages.forEach((entry, pageIndex) => {
    const page = entry.content
    statements.push(
      `INSERT INTO pages (slug, path, seo_title, seo_description, kicker, title, emphasis, lead, sort_order) VALUES (${sqlString(entry.slug)}, ${sqlString(page.path)}, ${sqlString(page.seoTitle)}, ${sqlString(page.seoDescription)}, ${sqlString(page.kicker)}, ${sqlString(page.title)}, ${sqlString(page.emphasis)}, ${sqlString(page.lead)}, ${pageIndex + 1})`,
    )

    page.sections.forEach((section, sectionIndex) => {
      const sectionId = `${entry.slug}:${section.id}`
      statements.push(
        `INSERT INTO sections (id, page_slug, section_key, nav, kicker, title, emphasis, variant, sort_order) VALUES (${sqlString(sectionId)}, ${sqlString(entry.slug)}, ${sqlString(section.id)}, ${sqlString(section.nav)}, ${sqlString(section.kicker)}, ${sqlString(section.title)}, ${sqlString(section.emphasis)}, ${sqlString(section.variant)}, ${sectionIndex + 1})`,
      )

      section.paragraphs.forEach((paragraph, index) => {
        statements.push(
          `INSERT INTO section_paragraphs (section_id, sort_order, body) VALUES (${sqlString(sectionId)}, ${index + 1}, ${sqlString(paragraph)})`,
        )
      })

      section.highlights?.forEach((highlight, index) => {
        statements.push(
          `INSERT INTO section_highlights (section_id, sort_order, body) VALUES (${sqlString(sectionId)}, ${index + 1}, ${sqlString(highlight)})`,
        )
      })

      section.images.forEach((image, index) => {
        files.add(image.file)
        statements.push(
          `INSERT INTO section_images (section_id, sort_order, r2_key, caption) VALUES (${sqlString(sectionId)}, ${index + 1}, ${sqlString(image.file)}, ${sqlString(image.caption)})`,
        )
      })
    })
  })

  return { statements, files }
}

async function loadPages() {
  const vite = await createServer({
    configFile: path.join(root, 'vite.config.ts'),
    server: { middlewareMode: true, hmr: false },
    appType: 'custom',
    logLevel: 'error',
  })

  try {
    const mod = await vite.ssrLoadModule('/src/data/dossier/index.ts')
    return mod.dossierPages
  } finally {
    await vite.close()
  }
}

async function seedLocal(statements, files) {
  const wrangler = await import('wrangler')
  if (typeof wrangler.getPlatformProxy !== 'function') {
    throw new Error('Esta versión de Wrangler no expone getPlatformProxy.')
  }

  const proxy = await wrangler.getPlatformProxy({
    configPath: path.join(root, 'wrangler.toml'),
    persist: { path: path.join(root, '.wrangler', 'state', 'v3') },
  })

  try {
    const migration = sqlScript(await readFile(migrationPath, 'utf8'))
    for (const statement of migration) {
      await proxy.env.DB.exec(statement)
    }
    for (const statement of statements) {
      await proxy.env.DB.exec(statement)
    }

    let uploaded = 0
    for (const fileName of files) {
      const bytes = await readFile(path.join(imagesDir, fileName))
      await proxy.env.MEDIA.put(fileName, bytes, {
        httpMetadata: { contentType: contentTypeFor(fileName) },
      })
      uploaded += 1
      if (uploaded % 20 === 0) console.log(`Imágenes locales: ${uploaded}/${files.size}`)
    }
    console.log(`Imágenes locales: ${uploaded}/${files.size}`)
  } finally {
    await proxy.dispose()
  }
}

function runWrangler(args) {
  const result = spawnSync(wranglerBin, args, { cwd: root, encoding: 'utf8' })
  if (result.stdout) process.stdout.write(result.stdout)
  if (result.stderr) process.stderr.write(result.stderr)
  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

async function seedRemote(statements, files) {
  await mkdir(path.dirname(seedPath), { recursive: true })
  await writeFile(seedPath, `${statements.join(';\n')};\n`)
  runWrangler(['d1', 'migrations', 'apply', 'gastromenu', '--remote'])

  for (const [index, group] of statementGroups(statements).entries()) {
    const file = path.join(root, 'cloudflare', `.seed-${index}.sql`)
    await writeFile(file, `${group.join(';\n')};\n`)
    console.log(`Subiendo textos, lote ${index + 1}`)
    runWrangler(['d1', 'execute', 'gastromenu', '--remote', `--file=${file}`])
  }

  let uploaded = 0
  for (const fileName of files) {
    runWrangler([
      'r2',
      'object',
      'put',
      `gastromenu-media/${fileName}`,
      `--file=${path.join(imagesDir, fileName)}`,
      `--content-type=${contentTypeFor(fileName)}`,
      '--remote',
    ])
    uploaded += 1
    if (uploaded % 10 === 0) console.log(`Imágenes remotas: ${uploaded}/${files.size}`)
  }
  console.log(`Imágenes remotas: ${uploaded}/${files.size}`)
}

const pages = await loadPages()
const { statements, files } = buildStatements(pages)
console.log(`${pages.length} páginas, ${statements.length} sentencias, ${files.size} imágenes`)

if (remote) {
  await seedRemote(statements, files)
} else {
  await seedLocal(statements, files)
}

console.log(remote ? 'Contenido publicado en Cloudflare.' : 'Contenido cargado en D1 y R2 locales.')
