import { useMemo, useState } from 'react'
import { BrandDivider } from '@/components/ui/BrandDivider'
import { GalleryLightbox, type GallerySlide } from '@/components/ui/GalleryLightbox'
import { ImageCard } from '@/components/ui/ImageCard'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { getItemsByCategory, useGallery } from '@/features/gallery/hooks/useGallery'
import { GoldText } from '@/components/ui/GoldText'
import { getBentoLayout } from '@/lib/gallery/bentoGrid'

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
        <p className="text-center text-stone font-label text-sm mb-12" aria-live="polite">
          Cargando galería…
        </p>
      )}

      <div className="space-y-24 md:space-y-32">
        {categories.map((category) => {
          const categoryItems = getItemsByCategory(items, category.id)
          if (!categoryItems.length) return null

          return (
            <div key={category.id}>
              <header className="mb-12 md:mb-16">
                <BrandDivider className="mb-6" />
                <h3 className="slide-label text-center mb-3">
                  {category.title}
                </h3>
                {category.subtitle && (
                  <p className="slide-body text-center text-sm max-w-2xl mx-auto">
                    {category.subtitle}
                  </p>
                )}
              </header>

              <div className="grid grid-cols-6 gap-2 sm:gap-3 md:gap-4">
                {categoryItems.map((item, index) => {
                  const { spanClass, size } = getBentoLayout(index, categoryItems.length)

                  return (
                    <div key={item.id} className={`${spanClass} min-h-[200px]`}>
                      <ImageCard
                        title={item.title}
                        description={item.description}
                        imageUrl={item.image_url}
                        size={size}
                        onClick={
                          item.image_url
                            ? () => setActiveSlideIndex(slideIndexById.get(item.id) ?? 0)
                            : undefined
                        }
                      />
                    </div>
                  )
                })}
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
