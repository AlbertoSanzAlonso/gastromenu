import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { COOKIE_NOTICE_IMAGE_SRC } from '@/data/brand'
import { useMessages } from '@/i18n/useMessages'

const STORAGE_KEY = 'gastromenu.cookie-notice'

export function CookieNotice() {
  const { m } = useMessages()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== '1') setOpen(true)
    } catch {
      setOpen(true)
    }
  }, [])

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // El aviso sigue pudiendo cerrarse aunque el navegador bloquee el almacenamiento.
    }
    setOpen(false)
  }

  if (!open) return null

  return (
    <aside className="cookie-notice" role="region" aria-label={m.cookies.label}>
      <img
        src={COOKIE_NOTICE_IMAGE_SRC}
        alt=""
        aria-hidden
        decoding="sync"
        className="cookie-notice-watermark"
      />
      <div className="cookie-notice-fade" aria-hidden />

      <Container className="cookie-notice-panel flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="slide-label mb-3 text-[10px]">{m.cookies.label}</p>
          <p className="slide-body text-sm leading-relaxed text-cream-muted">
            {m.cookies.body}{' '}
            <Link
              to="/privacidad#cookies"
              className="text-gold-slide underline underline-offset-4 transition-colors hover:text-gold-highlight"
            >
              {m.cookies.privacy}
            </Link>
            .
          </p>
        </div>
        <Button variant="outlineDark" onClick={accept} className="shrink-0">
          {m.cookies.accept}
        </Button>
      </Container>
    </aside>
  )
}
