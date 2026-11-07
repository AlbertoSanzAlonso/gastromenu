import { company } from '../../src/data/contact'

const OWNER_EMAIL = company.email
const FROM_EMAIL = `consultas@${company.domain}`
const FROM_NAME = 'GastroMenú Premium'

const LIMITS = {
  establishmentName: 120,
  establishmentType: 80,
  name: 80,
  phone: 40,
  address: 240,
  email: 160,
  interest: 120,
  interests: 8,
  message: 4000,
} as const

export interface ContactEnv {
  EMAIL?: {
    send(message: {
      to: string
      from: { email: string; name?: string }
      replyTo?: string
      subject: string
      text: string
      html: string
    }): Promise<{ messageId: string }>
  }
  CONTACT_TO?: string
  CONTACT_FROM?: string
  CONTACT_FROM_NAME?: string
}

interface Inquiry {
  establishmentName: string
  establishmentType: string
  firstName: string
  lastName: string
  phone: string
  address: string
  email: string
  interests: string[]
  message: string
}

type ParseResult =
  | { ok: true; kind: 'ignore' }
  | { ok: true; kind: 'inquiry'; inquiry: Inquiry }
  | { ok: false }

export async function handleContact(request: Request, env: ContactEnv): Promise<Response> {
  let body: unknown
  try {
    const raw = await request.text()
    if (raw.length > 20_000) return contactJson({ error: 'invalid' }, 400)
    body = JSON.parse(raw) as unknown
  } catch {
    return contactJson({ error: 'invalid' }, 400)
  }

  const parsed = parseInquiry(body)
  if (!parsed.ok) return contactJson({ error: 'invalid' }, 400)
  if (parsed.kind === 'ignore') return contactJson({ ok: true })

  if (!env.EMAIL) return contactJson({ error: 'send' }, 503)

  const inquiry = parsed.inquiry
  const to = env.CONTACT_TO || OWNER_EMAIL
  const from = env.CONTACT_FROM || FROM_EMAIL
  const fromName = env.CONTACT_FROM_NAME || FROM_NAME
  const subject = singleLine(`Nueva consulta — ${inquiry.establishmentName}`, 140)

  try {
    await env.EMAIL.send({
      to,
      from: { email: from, name: fromName },
      replyTo: inquiry.email,
      subject,
      text: inquiryText(inquiry),
      html: inquiryHtml(inquiry),
    })
  } catch (error) {
    console.error('No se pudo enviar la consulta', error)
    return contactJson({ error: 'send' }, 502)
  }

  return contactJson({ ok: true })
}

export function parseInquiry(body: unknown): ParseResult {
  if (!body || typeof body !== 'object') return { ok: false }
  const input = body as Record<string, unknown>

  if (typeof input.companyWebsite === 'string' && input.companyWebsite.trim()) {
    return { ok: true, kind: 'ignore' }
  }

  const establishmentName = text(input.establishmentName, LIMITS.establishmentName)
  const establishmentType = text(input.establishmentType, LIMITS.establishmentType)
  const firstName = text(input.firstName, LIMITS.name)
  const lastName = text(input.lastName, LIMITS.name)
  const phone = text(input.phone, LIMITS.phone)
  const address = text(input.address, LIMITS.address)
  const email = text(input.email, LIMITS.email).toLowerCase()
  const message = text(input.message, LIMITS.message, true)
  const interests = stringList(input.interests, LIMITS.interests, LIMITS.interest)

  if (!establishmentName || !establishmentType || !firstName || !lastName) return { ok: false }
  if (!phone || phone.replace(/\D/g, '').length < 6) return { ok: false }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false }
  if (input.privacyAccepted !== true) return { ok: false }
  if (!interests) return { ok: false }

  return {
    ok: true,
    kind: 'inquiry',
    inquiry: {
      establishmentName,
      establishmentType,
      firstName,
      lastName,
      phone,
      address,
      email,
      interests,
      message,
    },
  }
}

function text(value: unknown, max: number, multiline = false) {
  if (typeof value !== 'string') return ''
  const normalized = multiline
    ? value.replace(/\r\n/g, '\n').replace(/[^\S\n]+/g, ' ').trim()
    : value.replace(/\s+/g, ' ').trim()
  return normalized.slice(0, max)
}

function stringList(value: unknown, maxItems: number, maxLength: number) {
  if (!Array.isArray(value)) return null
  if (value.length > maxItems) return null
  const items: string[] = []
  for (const item of value) {
    const clean = text(item, maxLength)
    if (!clean) return null
    items.push(clean)
  }
  return items
}

function singleLine(value: string, max: number) {
  return value.replace(/[\r\n]+/g, ' ').trim().slice(0, max)
}

function inquiryText(inquiry: Inquiry) {
  const rows = [
    `Establecimiento: ${inquiry.establishmentName}`,
    `Tipo: ${inquiry.establishmentType}`,
    `Contacto: ${inquiry.firstName} ${inquiry.lastName}`,
    `Teléfono: ${inquiry.phone}`,
    `Correo: ${inquiry.email}`,
    `Dirección: ${inquiry.address || 'No indicada'}`,
    `Intereses: ${inquiry.interests.length ? inquiry.interests.join(', ') : 'No indicados'}`,
    '',
    'Mensaje:',
    inquiry.message || 'Sin mensaje.',
    '',
    'Responda a este correo para escribir a la persona de contacto.',
    company.url,
  ]
  return rows.join('\n')
}

function inquiryHtml(inquiry: Inquiry) {
  const rows = [
    ['Establecimiento', inquiry.establishmentName],
    ['Tipo', inquiry.establishmentType],
    ['Contacto', `${inquiry.firstName} ${inquiry.lastName}`],
    ['Teléfono', inquiry.phone],
    ['Correo', inquiry.email],
    ['Dirección', inquiry.address || 'No indicada'],
    ['Intereses', inquiry.interests.length ? inquiry.interests.join(', ') : 'No indicados'],
  ]

  const details = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:8px 16px 8px 0;color:#666;font-weight:600;vertical-align:top">${escapeHtml(label)}</th><td style="padding:8px 0">${escapeHtml(value)}</td></tr>`,
    )
    .join('')

  const message = escapeHtml(inquiry.message || 'Sin mensaje.').replaceAll('\n', '<br>')

  return `<!doctype html>
<html lang="es">
  <body style="margin:0;background:#f6f3ee;color:#1c1917;font-family:Georgia,serif">
    <div style="max-width:640px;margin:0 auto;padding:32px 20px">
      <p style="letter-spacing:0.18em;text-transform:uppercase;font-size:12px;color:#8a7340">GastroMenú Premium</p>
      <h1 style="font-weight:400;font-size:28px;margin:8px 0 24px">Nueva consulta</h1>
      <table style="width:100%;border-collapse:collapse;font-size:16px">${details}</table>
      <h2 style="font-weight:400;font-size:18px;margin:28px 0 8px">Mensaje</h2>
      <p style="white-space:normal;line-height:1.5;margin:0">${message}</p>
      <p style="margin-top:28px;color:#666;font-size:14px">Responda a este correo para escribir a la persona de contacto.</p>
    </div>
  </body>
</html>`
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function contactJson(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET, POST, OPTIONS',
      'access-control-allow-headers': 'content-type',
      'cache-control': 'no-store',
    },
  })
}
