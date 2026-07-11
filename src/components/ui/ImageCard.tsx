interface ImageCardProps {
  title: string
  description?: string | null
  imageUrl?: string | null
  size?: 'large' | 'compact'
  onClick?: () => void
}

export function ImageCard({
  title,
  description,
  imageUrl,
  size = 'compact',
  onClick,
}: ImageCardProps) {
  const isInteractive = Boolean(imageUrl && onClick)

  return (
    <article
      className={`
        group relative h-full w-full overflow-hidden bg-ink-muted
        transition-transform duration-600 ease-premium
        ${size === 'large' ? 'min-h-[220px] sm:min-h-[260px] lg:min-h-[340px]' : 'min-h-[200px] sm:min-h-[220px] lg:min-h-[280px]'}
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
      <div className="absolute inset-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-ink-muted">
            <span
              className="font-brand text-5xl font-semibold text-gold-slide/20 select-none"
              aria-hidden
            >
              G
            </span>
          </div>
        )}
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5 transition-opacity duration-500 group-hover:from-black/90 group-hover:via-black/45"
        aria-hidden
      />

      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 md:p-8 lg:p-10 pointer-events-none">
        <h3
          className={`slide-heading !text-gold-slide leading-tight ${
            size === 'large'
              ? 'text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem]'
              : 'text-xl sm:text-2xl md:text-3xl'
          }`}
        >
          {title}
        </h3>
        {description && (
          <p className="mt-2 max-w-md font-label text-sm md:text-base font-normal normal-case tracking-normal !text-gold-light leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </article>
  )
}
