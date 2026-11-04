import { useEffect, useId, useRef, useState } from 'react'
import { useMessages } from '@/i18n/useMessages'

interface ExpandableCopyProps {
  paragraphs: string[]
  highlights?: string[]
  mirrored?: boolean
  sectionId?: string
}

export function ExpandableCopy({
  paragraphs,
  highlights,
  mirrored = false,
  sectionId,
}: ExpandableCopyProps) {
  const { m } = useMessages()
  const copyId = useId()
  const copyRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [truncated, setTruncated] = useState(false)

  useEffect(() => {
    const node = copyRef.current
    if (!node) return

    const measure = () => {
      if (node.dataset.open === 'true') return
      setTruncated(node.scrollHeight > node.clientHeight + 2)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [paragraphs, highlights])

  function toggle() {
    setOpen((current) => {
      const next = !current
      if (!next && sectionId) {
        requestAnimationFrame(() => {
          const section = document.getElementById(sectionId)
          if (section && section.getBoundingClientRect().top < 80) {
            section.scrollIntoView({ block: 'start' })
          }
        })
      }
      return next
    })
  }

  const canToggle = truncated || open

  return (
    <>
      <div
        id={copyId}
        ref={copyRef}
        data-open={open ? 'true' : 'false'}
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
