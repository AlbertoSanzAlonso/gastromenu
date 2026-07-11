interface ImageCardProps {
  title: string
  description?: string | null
  imageUrl?: string | null
  featured?: boolean
  onClick?: () => void
}

export function ImageCard({
  title,
  description,
  imageUrl,
  featured = false,
  onClick,
}: ImageCardProps) {
  const isInteractive = Boolean(imageUrl && onClick)

  return (
    <article
      className={`
        group relative w-full max-w-[220px] sm:max-w-[240px] overflow-hidden bg-beige-200/80
        transition-all duration-600 ease-premium
        hover:shadow-xl hover:shadow-ink/10
        ${featured ? 'sm:max-w-[320px] lg:max-w-[360px] md:col-span-2 justify-self-center' : 'justify-self-center'}
        ${isInteractive ? 'cursor-pointer' : ''}
      `}
      onClick={isInteractive ? onClick : undefined}
      onKeyDown={
        isInteractive
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onClick?.()
              }
            }
          : undefined
      }
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={isInteractive ? `Ver ${title}` : undefined}
    >
      <div
        className={`
          relative w-full overflow-hidden
          ${featured ? 'aspect-[16/10] max-h-[200px] sm:max-h-[220px]' : 'aspect-[3/4] max-h-[200px] sm:max-h-[220px]'}
        `}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover opacity-70 transition-all duration-600 ease-premium group-hover:scale-105 group-hover:opacity-85"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-beige-200 via-beige-300 to-beige-400">
            <span className="font-brand text-5xl font-semibold text-gold/20 select-none" aria-hidden>
              G
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/15 to-transparent opacity-70 transition-opacity duration-400 group-hover:opacity-80" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 pointer-events-none">
        <h3 className="font-brand text-sm md:text-base text-cream font-medium uppercase tracking-[0.06em] leading-snug">
          {title}
        </h3>
        {description && (
          <p className="mt-1.5 brand-eyebrow text-[9px]">
            {description}
          </p>
        )}
      </div>
    </article>
  )
}
