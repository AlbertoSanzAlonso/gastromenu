import { useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'

export interface GallerySlide {
  id: string
  title: string
  description: string | null
  imageUrl: string
}

interface GalleryLightboxProps {
  slides: GallerySlide[]
  activeIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

const navButtonClass = `
  flex shrink-0 items-center justify-center
  h-14 w-14 md:h-16 md:w-16
  border-2 border-cream/50 bg-charcoal/90 text-cream
  text-3xl md:text-4xl font-light leading-none
  transition-all duration-300
  hover:border-gold-light hover:bg-charcoal hover:text-gold-light
  disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-cream/50 disabled:hover:bg-charcoal/90 disabled:hover:text-cream
  cursor-pointer
`

export function GalleryLightbox({
  slides,
  activeIndex,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const slide = slides[activeIndex]
  const hasPrev = activeIndex > 0
  const hasNext = activeIndex < slides.length - 1

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(activeIndex - 1)
  }, [activeIndex, hasPrev, onNavigate])

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(activeIndex + 1)
  }, [activeIndex, hasNext, onNavigate])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') goPrev()
      if (event.key === 'ArrowRight') goNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, goPrev, goNext])

  if (!slide) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={`Galería: ${slide.title}`}
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/95 backdrop-blur-sm cursor-default"
        onClick={onClose}
        aria-label="Cerrar galería"
      />

      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-20 font-brand text-sm md:text-base uppercase tracking-[0.25em] text-cream border-2 border-cream/40 bg-charcoal/90 px-5 py-2.5 hover:border-gold-light hover:text-gold-light transition-colors cursor-pointer"
        aria-label="Cerrar"
      >
        Cerrar ✕
      </button>

      <button
        type="button"
        onClick={goPrev}
        disabled={!hasPrev}
        className={`absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 ${navButtonClass}`}
        aria-label="Imagen anterior"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={goNext}
        disabled={!hasNext}
        className={`absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 ${navButtonClass}`}
        aria-label="Imagen siguiente"
      >
        ›
      </button>

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-14 md:px-20">
        <figure className="flex w-full flex-col items-center">
          <div className="w-full overflow-hidden bg-ink-soft border-2 border-cream/20 shadow-2xl">
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="w-full max-h-[62vh] object-contain"
              decoding="async"
            />
          </div>

          <figcaption className="mt-8 text-center max-w-2xl">
            <p className="font-brand text-lg md:text-2xl uppercase tracking-[0.18em] text-cream font-medium">
              {slide.title}
            </p>
            {slide.description && (
              <p className="mt-4 font-brand text-sm md:text-base uppercase tracking-[0.3em] text-gold-light font-normal">
                {slide.description}
              </p>
            )}
            <p className="mt-6 inline-flex items-center justify-center min-w-[5rem] px-4 py-2 border border-cream/35 bg-charcoal/80 font-brand text-sm md:text-base uppercase tracking-[0.25em] text-cream tabular-nums">
              {activeIndex + 1} / {slides.length}
            </p>
          </figcaption>
        </figure>
      </div>
    </div>,
    document.body,
  )
}
