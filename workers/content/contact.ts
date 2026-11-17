import { company } from '../../src/data/contact'
import { EMAIL_LOGO_PNG_BASE64 } from './emailLogo'

const OWNER_EMAIL = company.email
const FROM_EMAIL = company.email
const FROM_NAME = 'GastroMenu Premium'

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
  RESEND_API_KEY?: string
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

  if (!env.RESEND_API_KEY) return contactJson({ error: 'send' }, 503)

  const inquiry = parsed.inquiry
  const to = env.CONTACT_TO || OWNER_EMAIL
  const fromEmail = env.CONTACT_FROM || FROM_EMAIL
  const fromName = env.CONTACT_FROM_NAME || FROM_NAME

  const notified = await sendResendEmail(env.RESEND_API_KEY, {
    from: `${fromName} <${fromEmail}>`,
    to: [to],
    replyTo: inquiry.email,
    subject: singleLine(`Nueva consulta — ${inquiry.establishmentName}`, 140),
    text: inquiryText(inquiry),
    html: inquiryHtml(inquiry),
  })

  if (!notified.ok) {
    console.error('No se pudo enviar la consulta', notified.status, notified.detail)
    return contactJson({ error: 'send' }, 502)
  }

  // Agradecimiento al visitante. Si falla (dominio aún no verificado), la consulta ya quedó.
  const thanked = await sendResendEmail(env.RESEND_API_KEY, {
    from: `${fromName} <${fromEmail}>`,
    to: [inquiry.email],
    replyTo: OWNER_EMAIL,
    subject: 'Hemos recibido su consulta — GastroMenu Premium',
    text: thanksText(inquiry),
    html: thanksHtml(inquiry),
  })
  if (!thanked.ok) {
    console.error('No se pudo enviar el agradecimiento', thanked.status, thanked.detail)
  }

  return contactJson({ ok: true })
}

async function sendResendEmail(
  apiKey: string,
  message: {
    from: string
    to: string[]
    replyTo?: string
    subject: string
    text: string
    html: string
  },
) {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: message.from,
        to: message.to,
        reply_to: message.replyTo,
        subject: message.subject,
        text: message.text,
        html: message.html,
        attachments: [
          {
            filename: 'email-logo.png',
            content: EMAIL_LOGO_PNG_BASE64,
            content_id: 'gm-logo',
          },
        ],
      }),
    })

    if (!response.ok) {
      return { ok: false as const, status: response.status, detail: await response.text() }
    }
    return { ok: true as const }
  } catch (error) {
    return {
      ok: false as const,
      status: 0,
      detail: error instanceof Error ? error.message : String(error),
    }
  }
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

function thanksText(inquiry: Inquiry) {
  return [
    `Hola ${inquiry.firstName},`,
    '',
    'Gracias por escribirnos. Hemos recibido su consulta y nos pondremos en contacto lo antes posible.',
    '',
    `Establecimiento: ${inquiry.establishmentName}`,
    '',
    'Un saludo,',
    'GastroMenu Premium',
    company.email,
    company.url,
  ].join('\n')
}

function thanksHtml(inquiry: Inquiry) {
  const body = `
    <tr>
      <td style="padding:8px 28px 8px">
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.32em;text-transform:uppercase;color:#c5a059;text-align:center">
          Consulta recibida
        </p>
        <h1 style="margin:12px 0 0;font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:28px;line-height:1.25;color:#f6f6f0;text-align:center">
          Gracias, ${escapeHtml(inquiry.firstName)}
        </h1>
      </td>
    </tr>
    <tr>
      <td style="padding:28px 28px 12px">
        <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.55;color:#f6f6f0;text-align:center">
          Hemos recibido su consulta sobre <strong style="font-weight:400;color:#c5a059">${escapeHtml(inquiry.establishmentName)}</strong>
          y nos pondremos en contacto lo antes posible.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 28px 36px;border-top:1px solid rgba(197,160,89,0.2)">
        <p style="margin:24px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:#9a9a9a;text-align:center">
          Si necesita algo urgente, escríbanos a
          <a href="mailto:${OWNER_EMAIL}" style="color:#c5a059;text-decoration:none">${OWNER_EMAIL}</a>
          o llámenos.
        </p>
        <p style="margin:10px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#c5a059;text-align:center">
          <a href="${company.url}" style="color:#c5a059;text-decoration:none">${escapeHtml(company.domain)}</a>
        </p>
      </td>
    </tr>`

  return brandEmail(body)
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
      ([label, value]) => `
        <tr>
          <td style="padding:0 0 18px 0">
            <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#c5a059;font-weight:500">
              ${escapeHtml(label)}
            </p>
            <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.45;color:#f6f6f0;word-break:break-word;overflow-wrap:anywhere">
              ${escapeHtml(value)}
            </p>
          </td>
        </tr>`,
    )
    .join('')

  const message = escapeHtml(inquiry.message || 'Sin mensaje.').replaceAll('\n', '<br>')

  const body = `
    <tr>
      <td style="padding:8px 28px 8px">
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.32em;text-transform:uppercase;color:#c5a059;text-align:center">
          Nueva consulta
        </p>
        <h1 style="margin:12px 0 0;font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:28px;line-height:1.25;color:#f6f6f0;text-align:center">
          ${escapeHtml(inquiry.establishmentName)}
        </h1>
      </td>
    </tr>
    <tr>
      <td style="padding:28px 28px 8px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%">
          ${details}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 28px 32px">
        <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#c5a059;font-weight:500">
          Mensaje
        </p>
        <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.55;color:#f6f6f0;word-break:break-word;overflow-wrap:anywhere">
          ${message}
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:0 28px 36px;border-top:1px solid rgba(197,160,89,0.2)">
        <p style="margin:24px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:#9a9a9a;text-align:center">
          Responda a este correo para escribir a la persona de contacto.
        </p>
        <p style="margin:10px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#c5a059;text-align:center">
          <a href="${company.url}" style="color:#c5a059;text-decoration:none">${escapeHtml(company.domain)}</a>
        </p>
      </td>
    </tr>`

  return brandEmail(body)
}

function brandEmail(innerRows: string) {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="color-scheme" content="dark">
    <meta name="supported-color-schemes" content="dark">
  </head>
  <body style="margin:0;padding:0;background:#000000;color:#f6f6f0">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#000000;width:100%">
      <tr>
        <td align="center" style="padding:28px 16px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background:#0a0a0a;border:1px solid rgba(197,160,89,0.28)">
            <tr>
              <td align="center" style="padding:36px 28px 20px">
                <img src="cid:gm-logo" width="180" alt="GastroMenu Premium" style="display:block;width:180px;max-width:70%;height:auto;border:0;margin:0 auto">
              </td>
            </tr>
            ${innerRows}
          </table>
        </td>
      </tr>
    </table>
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
