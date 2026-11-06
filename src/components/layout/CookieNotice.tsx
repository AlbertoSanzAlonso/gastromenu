import { useEffect, useState, type TransitionEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { FOOTER_WATERMARK_SRC } from '@/data/brand'
import { useMessages } from '@/i18n/useMessages'

const STORAGE_KEY = 'gastromenu.cookie-notice'
const EXIT_MS = 750

export function CookieNotice() {
  const { m } = useMessages()
  const [open, setOpen] = useState(false)
  const [shown, setShown] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== '1') setOpen(true)
    } catch {
      setOpen(true)
    }
  }, [])

  useEffect(() => {
    if (!open || leaving) return
    let inner = 0
    const frame = window.requestAnimationFrame(() => {
      inner = window.requestAnimationFrame(() => setShown(true))
    })
    return () => {
      window.cancelAnimationFrame(frame)
      window.cancelAnimationFrame(inner)
    }
  }, [open, leaving])

  useEffect(() => {
    if (!leaving) return
    const id = window.setTimeout(() => setOpen(false), EXIT_MS + 80)
    return () => window.clearTimeout(id)
  }, [leaving])

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // El aviso sigue pudiendo cerrarse aunque el navegador bloquee el almacenamiento.
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOpen(false)
      return
    }
    setLeaving(true)
    setShown(false)
  }

  function onTransitionEnd(event: TransitionEvent<HTMLElement>) {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform' || !leaving) return
    setOpen(false)
  }

  if (!open) return null

  return (
    <aside
      className="cookie-notice"
      data-shown={shown ? 'true' : 'false'}
      data-leaving={leaving ? 'true' : 'false'}
      role="region"
      aria-label={m.cookies.label}
      onTransitionEnd={onTransitionEnd}
    >
      <div className="cookie-notice-art" aria-hidden>
        <img
          src={FOOTER_WATERMARK_SRC}
          alt=""
          decoding="sync"
          className="cookie-notice-watermark cookie-notice-watermark--soft"
        />
        <img
          src={FOOTER_WATERMARK_SRC}
          alt=""
          decoding="sync"
          className="cookie-notice-watermark"
        />
      </div>
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
