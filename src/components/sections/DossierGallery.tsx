import { useEffect, useMemo, useState } from 'react'
import { GalleryLightbox, type GallerySlide } from '@/components/ui/GalleryLightbox'
import { dossierImageUrl, type DossierImage } from '@/data/dossierTypes'

const SAMPLE_MS = 5200
const CROSSFADE_MS = 1400

interface DossierGalleryProps {
  images: DossierImage[]
}

export function DossierGallery({ images }: DossierGalleryProps) {
  const [previewIndex, setPreviewIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [motionReduced, setMotionReduced] = useState(false)
  const [pageHidden, setPageHidden] = useState(false)

  const slides = useMemo<GallerySlide[]>(
    () =>
      images.map((image, index) => ({
        id: `${image.file}-${index}`,
        title: image.caption,
        description: null,
        imageUrl: dossierImageUrl(image),
      })),
    [images],
  )

  const activePreview = images.length === 0 ? 0 : previewIndex % images.length
  const preview = images[activePreview]
  const nextPreview = images.length < 2 ? activePreview : (activePreview + 1) % images.length

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => setMotionReduced(media.matches)
    const syncVisibility = () => setPageHidden(document.hidden)

    syncMotion()
    syncVisibility()
    media.addEventListener('change', syncMotion)
    document.addEventListener('visibilitychange', syncVisibility)

    return () => {
      media.removeEventListener('change', syncMotion)
      document.removeEventListener('visibilitychange', syncVisibility)
    }
  }, [])

  useEffect(() => {
    if (images.length < 2 || lightboxIndex !== null || motionReduced || pageHidden) return

    const id = window.setInterval(() => {
      setPreviewIndex((current) => (current + 1) % images.length)
    }, SAMPLE_MS)

    return () => window.clearInterval(id)
  }, [images.length, lightboxIndex, motionReduced, pageHidden])

  if (!preview) return null

  return (
    <>
      <figure className="m-0">
        <button
          type="button"
          onClick={() => setLightboxIndex(activePreview)}
          className="group relative block w-full cursor-pointer border-0 bg-transparent p-0 text-left shadow-[0_22px_46px_-18px_rgb(0_0_0_/_0.55)]"
          aria-label={`Abrir galería, ${images.length} ${images.length === 1 ? 'imagen' : 'imágenes'}`}
        >
          <span className="relative block aspect-[4/3] max-h-[32rem] w-full overflow-hidden">
            {images.map((image, index) => {
              const active = index === activePreview

              return (
                <span
                  key={`${image.file}-${index}`}
                  aria-hidden
                  className={`absolute inset-0 transition-opacity ease-premium motion-reduce:transition-none ${
                    active ? 'z-[1] opacity-100' : 'z-0 opacity-0'
                  }`}
                  style={{ transitionDuration: `${CROSSFADE_MS}ms` }}
                >
                  <img
                    src={dossierImageUrl(image)}
                    alt=""
                    loading={index === activePreview || index === nextPreview ? 'eager' : 'lazy'}
                    decoding="async"
                    className={`h-full w-full object-cover ease-premium motion-reduce:scale-100 motion-reduce:transition-none ${
                      active ? 'scale-100 group-hover:scale-[1.04]' : 'scale-[1.05]'
                    }`}
                    style={{ transitionDuration: `${CROSSFADE_MS}ms`, transitionProperty: 'scale' }}
                  />
                </span>
              )
            })}
          </span>
        </button>
        <figcaption className="mt-4 flex items-baseline justify-between gap-4">
          <span className="slide-label text-[10px] md:text-xs">{preview.caption}</span>
          {images.length > 1 && (
            <span className="slide-label shrink-0 text-[10px] tabular-nums opacity-80">
              {activePreview + 1} / {images.length}
            </span>
          )}
        </figcaption>
      </figure>

      {lightboxIndex !== null && (
        <GalleryLightbox
          slides={slides}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  )
}
