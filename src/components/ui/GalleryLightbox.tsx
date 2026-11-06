import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useMessages } from '@/i18n/useMessages'
import { ZoomableImage } from '@/components/ui/ZoomableImage'

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
  group flex shrink-0 items-center justify-center
  h-14 w-14 md:h-16 md:w-16
  text-cream
  text-3xl md:text-4xl font-light leading-none
  disabled:opacity-30 disabled:cursor-not-allowed
  cursor-pointer
`

const navArrowClass = `
  block transition-all duration-300 ease-premium
  group-hover:scale-110 group-hover:text-gold-light
`

export function GalleryLightbox({
  slides,
  activeIndex,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const { m } = useMessages()
  const slide = slides[activeIndex]
  const hasPrev = activeIndex > 0
  const hasNext = activeIndex < slides.length - 1
  const [zoomed, setZoomed] = useState(false)
  const [zoomIndex, setZoomIndex] = useState(activeIndex)
  if (zoomIndex !== activeIndex) {
    setZoomIndex(activeIndex)
    setZoomed(false)
  }
  const handleZoomedChange = useCallback((next: boolean) => {
    setZoomed(next)
  }, [])

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
      className={`fixed inset-0 z-[100] flex items-center justify-center ${
        zoomed ? 'px-1 py-2 md:p-4' : 'p-4 md:p-10'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={`${m.gallery.dialog}: ${slide.title}`}
    >
      <div className="lightbox-backdrop" aria-hidden>
        <img
          key={slide.imageUrl}
          src={slide.imageUrl}
          alt=""
          className="lightbox-watermark"
        />
        <div className="lightbox-watermark-veil" />
      </div>

      <button
        type="button"
        className="absolute inset-0 z-[1] cursor-default"
        onClick={onClose}
        aria-label={m.gallery.closeGallery}
      />

      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-20 font-brand text-sm md:text-base uppercase tracking-[0.25em] text-cream px-5 py-2.5 hover:text-gold-light hover:scale-105 transition-all duration-300 ease-premium cursor-pointer"
        aria-label={m.gallery.close}
      >
        {m.gallery.close} ✕
      </button>

      <button
        type="button"
        onClick={goPrev}
        disabled={!hasPrev}
        className={`absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 ${navButtonClass}`}
        aria-label={m.gallery.previous}
      >
        <span className={navArrowClass} aria-hidden>
          ‹
        </span>
      </button>

      <button
        type="button"
        onClick={goNext}
        disabled={!hasNext}
        className={`absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 ${navButtonClass}`}
        aria-label={m.gallery.next}
      >
        <span className={navArrowClass} aria-hidden>
          ›
        </span>
      </button>

      <div
        className={`relative z-10 flex w-full flex-col items-center ${
          zoomed ? 'max-w-none px-1 md:px-8' : 'max-w-3xl px-14 md:px-20'
        }`}
      >
        <figure className="flex w-full flex-col items-center">
          <ZoomableImage
            key={`${slide.id}-${activeIndex}`}
            src={slide.imageUrl}
            alt={slide.title}
            zoomInLabel={m.gallery.zoomIn}
            zoomOutLabel={m.gallery.zoomOut}
            onZoomedChange={handleZoomedChange}
          />

          <figcaption
            aria-hidden={zoomed}
            className={`w-full max-w-2xl text-center ${
              zoomed ? 'h-0 overflow-hidden opacity-0' : 'mt-5 md:mt-8'
            }`}
          >
            <p className="font-brand text-lg md:text-2xl uppercase tracking-[0.18em] text-cream font-medium">
              {slide.title}
            </p>
            {slide.description && (
              <p className="mt-4 font-brand text-sm md:text-base uppercase tracking-[0.3em] text-gold-light font-normal">
                {slide.description}
              </p>
            )}
            <p className="mt-6 inline-flex items-center justify-center min-w-[5rem] px-4 py-2 font-brand text-sm md:text-base uppercase tracking-[0.25em] text-cream tabular-nums">
              {activeIndex + 1} / {slides.length}
            </p>
            <p className="mt-2 font-brand text-[10px] uppercase tracking-[0.16em] text-cream/55 md:text-xs md:tracking-[0.28em]">
              {zoomed ? m.gallery.zoomHintActive : m.gallery.zoomHint}
            </p>
          </figcaption>
        </figure>
        {zoomed && (
          <p className="pointer-events-none fixed bottom-3 left-1/2 z-20 -translate-x-1/2 font-brand text-[10px] uppercase tracking-[0.16em] text-cream/70 md:text-xs md:tracking-[0.28em]">
            {m.gallery.zoomHintActive}
          </p>
        )}
      </div>
    </div>,
    document.body,
  )
}
