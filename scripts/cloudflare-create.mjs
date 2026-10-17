import { spawnSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const wranglerBin = path.join(root, 'node_modules', '.bin', 'wrangler')
const configPath = path.join(root, 'wrangler.toml')

function run(args) {
  const result = spawnSync(wranglerBin, args, {
    cwd: root,
    encoding: 'utf8',
  })
  const output = `${result.stdout ?? ''}\n${result.stderr ?? ''}`
  return { status: result.status ?? 1, output }
}

function requireAuth() {
  const whoami = run(['whoami'])
  if (whoami.status !== 0 || /not authenticated/i.test(whoami.output)) {
    console.error('Cloudflare no está autenticado. Ejecuta: npx wrangler login')
    process.exit(1)
  }
}

function databaseIdFrom(output) {
  const labeled = output.match(/database_id = "([0-9a-f-]{36})"/i)
  if (labeled) return labeled[1]
  const uuid = output.match(/\b([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\b/i)
  return uuid?.[1] ?? null
}

function writeDatabaseId(databaseId) {
  const config = readFileSync(configPath, 'utf8')
  const next = config.replace(
    /database_id = "[^"]+"/,
    `database_id = "${databaseId}"`,
  )
  writeFileSync(configPath, next)
}

requireAuth()

let databaseId = null
const info = run(['d1', 'info', 'gastromenu'])
if (info.status === 0) {
  databaseId = databaseIdFrom(info.output)
}

if (!databaseId) {
  const created = run(['d1', 'create', 'gastromenu'])
  process.stdout.write(created.output)
  if (created.status !== 0) process.exit(created.status)
  databaseId = databaseIdFrom(created.output)
}

if (!databaseId) {
  console.error('No se pudo leer el identificador de la base D1.')
  process.exit(1)
}

writeDatabaseId(databaseId)
console.log(`D1 gastromenu: ${databaseId}`)

const bucket = run(['r2', 'bucket', 'create', 'gastromenu-media'])
process.stdout.write(bucket.output)
if (bucket.status !== 0 && !/already exists/i.test(bucket.output)) {
  process.exit(bucket.status)
}

const migrated = run(['d1', 'migrations', 'apply', 'gastromenu', '--remote'])
process.stdout.write(migrated.output)
if (migrated.status !== 0) process.exit(migrated.status)

console.log('Recursos listos. Siguiente paso: npm run cf:seed:remote')
