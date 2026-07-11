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
        group relative w-full max-w-[220px] sm:max-w-[240px] overflow-hidden slide-frame bg-ink-soft/60
        transition-all duration-600 ease-premium
        hover:border-gold-slide/50
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
            className="h-full w-full object-cover opacity-75 transition-all duration-600 ease-premium group-hover:scale-105 group-hover:opacity-90"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-ink-muted">
            <span className="font-brand text-5xl font-semibold text-gold-slide/20 select-none" aria-hidden>
              G
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-80 transition-opacity duration-400 group-hover:opacity-90" />
      </div>

      <div className="px-4 py-4 md:py-5 text-center pointer-events-none border-t border-gold-slide/15 bg-ink/80">
        <h3 className="slide-label text-[10px] leading-snug">
          {title}
        </h3>
        {description && (
          <p className="mt-2 slide-body text-xs normal-case tracking-normal">
            {description}
          </p>
        )}
      </div>
    </article>
  )
}
