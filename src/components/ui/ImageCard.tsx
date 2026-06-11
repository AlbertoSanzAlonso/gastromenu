interface ImageCardProps {
  title: string
  description?: string | null
  imageUrl?: string | null
  featured?: boolean
}

export function ImageCard({
  title,
  description,
  imageUrl,
  featured = false,
}: ImageCardProps) {
  return (
    <article
      className={`
        group relative overflow-hidden bg-beige-200
        transition-all duration-600 ease-premium
        hover:shadow-2xl hover:shadow-ink/10
        ${featured ? 'md:col-span-2 md:row-span-2' : ''}
      `}
    >
      <div
        className={`
          relative w-full overflow-hidden
          ${featured ? 'aspect-[4/3] md:aspect-auto md:h-full min-h-[320px]' : 'aspect-[4/5]'}
        `}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-600 ease-premium group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-beige-200 via-beige-300 to-beige-400">
            <span className="font-display text-6xl text-gold/20 select-none" aria-hidden>
              G
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent opacity-80 transition-opacity duration-400 group-hover:opacity-90" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <h3 className="font-display text-xl md:text-2xl text-beige-50 font-light leading-snug">
          {title}
        </h3>
        {description && (
          <p className="mt-2 font-ui text-xs uppercase tracking-[0.2em] text-gold-light">
            {description}
          </p>
        )}
      </div>
    </article>
  )
}
