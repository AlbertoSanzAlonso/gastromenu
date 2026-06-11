import { ImageCard } from '@/components/ui/ImageCard'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { getItemsByCategory, useGallery } from '@/features/gallery/hooks/useGallery'
import { GoldText } from '@/components/ui/GoldText'

export function GallerySection() {
  const { categories, items, loading } = useGallery()

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
        <p className="text-center text-stone font-ui text-sm mb-12" aria-live="polite">
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
                <h3 className="font-display text-3xl md:text-4xl font-light text-ink mb-3">
                  {category.title}
                </h3>
                {category.subtitle && (
                  <p className="font-ui text-xs uppercase tracking-[0.25em] text-stone">
                    {category.subtitle}
                  </p>
                )}
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-fr">
                {categoryItems.map((item) => (
                  <ImageCard
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    imageUrl={item.image_url}
                    featured={item.featured}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
