import { useMemo, useState } from 'react'
import { GalleryLightbox, type GallerySlide } from '@/components/ui/GalleryLightbox'
import { ImageCard } from '@/components/ui/ImageCard'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { getItemsByCategory, useGallery } from '@/features/gallery/hooks/useGallery'
import { GoldText } from '@/components/ui/GoldText'

export function GallerySection() {
  const { categories, items, loading } = useGallery()
  const [activeSlideIndex, setActiveSlideIndex] = useState<number | null>(null)

  const slides = useMemo<GallerySlide[]>(() => {
    return categories.flatMap((category) =>
      getItemsByCategory(items, category.id)
        .filter((item): item is typeof item & { image_url: string } => Boolean(item.image_url))
        .map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          imageUrl: item.image_url,
        })),
    )
  }, [categories, items])

  const slideIndexById = useMemo(
    () => new Map(slides.map((slide, index) => [slide.id, index])),
    [slides],
  )

  return (
    <Section id="galeria" variant="beige" ariaLabel="Galería de productos">
      <Heading
        as="h2"
        subtitle="Todo lo que hacemos, de un vistazo"
        align="center"
        className="mx-auto"
      >
        Nuestra <GoldText>colección</GoldText>
      </Heading>

      {loading && (
        <p className="text-center text-stone font-brand text-sm mb-12" aria-live="polite">
          Cargando galería…
        </p>
      )}

      <div className="space-y-24 md:space-y-32">
        {categories.map((category) => {
          const categoryItems = getItemsByCategory(items, category.id)
          if (!categoryItems.length) return null

          return (
            <div key={category.id}>
              <header className="mb-12 md:mb-16 max-w-3xl">
                <h3 className="font-brand text-2xl md:text-3xl font-medium uppercase tracking-[0.06em] text-ink mb-3">
                  {category.title}
                </h3>
                {category.subtitle && (
                  <p className="brand-eyebrow text-[10px]">
                    {category.subtitle}
                  </p>
                )}
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 justify-items-center">
                {categoryItems.map((item) => (
                  <ImageCard
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    imageUrl={item.image_url}
                    featured={item.featured}
                    onClick={
                      item.image_url
                        ? () => setActiveSlideIndex(slideIndexById.get(item.id) ?? 0)
                        : undefined
                    }
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {activeSlideIndex !== null && slides.length > 0 && (
        <GalleryLightbox
          slides={slides}
          activeIndex={activeSlideIndex}
          onClose={() => setActiveSlideIndex(null)}
          onNavigate={setActiveSlideIndex}
        />
      )}
    </Section>
  )
}
