import { useId, useLayoutEffect, useRef, useState } from 'react'
import { useMessages } from '@/i18n/useMessages'

const COLLAPSED_HEIGHT = '11.5rem'
const ALIGN_AFTER_MS = 700

let scrollToken = 0

interface ExpandableCopyProps {
  paragraphs: string[]
  highlights?: string[]
  mirrored?: boolean
  sectionId?: string
  open: boolean
  onToggle: () => void
}

export function ExpandableCopy({
  paragraphs,
  highlights,
  mirrored = false,
  sectionId,
  open,
  onToggle,
}: ExpandableCopyProps) {
  const { m } = useMessages()
  const copyId = useId()
  const copyRef = useRef<HTMLDivElement>(null)
  const collapsedHeight = useRef(0)
  const overflowsRef = useRef(false)
  const didMount = useRef(false)
  const openRef = useRef(open)
  const [truncated, setTruncated] = useState(false)
  const [ready, setReady] = useState(false)
  openRef.current = open

  useLayoutEffect(() => {
    const node = copyRef.current
    if (!node) return

    const saved = node.style.height
    node.style.height = COLLAPSED_HEIGHT
    const clamped = node.getBoundingClientRect().height
    collapsedHeight.current = clamped
    node.style.height = saved

    const overflows = node.scrollHeight > clamped + 2
    overflowsRef.current = overflows
    setTruncated(overflows)

    if (openRef.current) node.style.height = 'auto'
    else node.style.height = overflows ? `${clamped}px` : 'auto'
    setReady(true)
  }, [paragraphs, highlights])

  useLayoutEffect(() => {
    const node = copyRef.current
    if (!node) return

    if (!didMount.current) {
      didMount.current = true
      if (open) node.style.height = 'auto'
      return
    }

    if (!overflowsRef.current) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      node.style.height = open ? 'auto' : `${collapsedHeight.current}px`
      return
    }

    const from = node.getBoundingClientRect().height
    const to = open ? node.scrollHeight : collapsedHeight.current
    node.style.height = `${from}px`
    node.offsetHeight
    node.style.height = `${to}px`

    const onEnd = (event: TransitionEvent) => {
      if (event.target !== node || event.propertyName !== 'height') return
      if (node.dataset.open === 'true') node.style.height = 'auto'
    }

    node.addEventListener('transitionend', onEnd)
    return () => node.removeEventListener('transitionend', onEnd)
  }, [open])

  function alignSection() {
    if (!sectionId) return
    document.getElementById(sectionId)?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  function toggle() {
    const closing = open
    onToggle()
    if (!sectionId) return

    if (closing) {
      requestAnimationFrame(() => {
        const section = document.getElementById(sectionId)
        if (section && section.getBoundingClientRect().top < 80) alignSection()
      })
      return
    }

    const token = ++scrollToken
    requestAnimationFrame(() => {
      if (token !== scrollToken) return
      alignSection()
    })
    window.setTimeout(() => {
      if (token !== scrollToken) return
      const section = document.getElementById(sectionId)
      if (!section) return
      const target = Number.parseFloat(getComputedStyle(section).scrollMarginTop) || 0
      if (Math.abs(section.getBoundingClientRect().top - target) > 12) alignSection()
    }, ALIGN_AFTER_MS)
  }

  const canToggle = truncated || open

  return (
    <>
      <div
        id={copyId}
        ref={copyRef}
        data-open={open ? 'true' : 'false'}
        data-truncated={truncated ? 'true' : 'false'}
        data-ready={ready ? 'true' : 'false'}
        className="dossier-copy mt-6 space-y-4"
      >
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="slide-body">
            {paragraph}
          </p>
        ))}
        {highlights && highlights.length > 0 && (
          <ul className="space-y-3 pt-4">
            {highlights.map((item) => (
              <li
                key={item}
                className={`flex gap-3 slide-body text-base ${mirrored ? 'lg:flex-row-reverse' : ''}`}
              >
                <span
                  className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-slide"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {canToggle && (
        <button
          type="button"
          className="slide-label mt-6 inline-flex cursor-pointer items-center border border-gold-slide/35 px-4 py-2 hover:border-gold-slide transition-colors duration-400"
          aria-expanded={open}
          aria-controls={copyId}
          onClick={toggle}
        >
          {open ? m.dossier.less : m.dossier.more}
        </button>
      )}
    </>
  )
}
