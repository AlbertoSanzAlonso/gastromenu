interface BrandDividerProps {
  className?: string
}

export function BrandDivider({ className = '' }: BrandDividerProps) {
  return (
    <div
      className={`flex items-center gap-3 w-full max-w-xs mx-auto ${className}`}
      aria-hidden
    >
      <span className="h-px flex-1 bg-gold-slide/40" />
      <span className="w-1.5 h-1.5 rotate-45 bg-gold-slide/70" />
      <span className="h-px flex-1 bg-gold-slide/40" />
    </div>
  )
}
