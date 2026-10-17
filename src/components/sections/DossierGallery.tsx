import { useMemo, useState } from 'react'
import { GalleryLightbox, type GallerySlide } from '@/components/ui/GalleryLightbox'
import { dossierImageUrl, type DossierImage } from '@/data/dossierTypes'

interface DossierGalleryProps {
  images: DossierImage[]
}

export function DossierGallery({ images }: DossierGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

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

  if (!images.length) return null

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {images.map((image, index) => (
          <button
            key={`${image.file}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative aspect-[4/3] overflow-hidden bg-beige-50 slide-frame cursor-pointer text-left"
          >
            <img
              src={dossierImageUrl(image)}
              alt={image.caption}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-3 pb-3 pt-10">
              <span className="slide-label !text-cream text-[10px]">{image.caption}</span>
            </span>
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <GalleryLightbox
          slides={slides}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </>
  )
}
