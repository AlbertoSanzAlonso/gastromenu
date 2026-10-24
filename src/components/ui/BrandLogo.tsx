import { BRAND_ICON_SRC, BRAND_LOCKUP_SRC } from '@/data/brand'

interface BrandLogoProps {
  className?: string
  variant?: 'mark' | 'lockup'
}

export function BrandLogo({
  className,
  variant = 'mark',
}: BrandLogoProps) {
  const lockup = variant === 'lockup'

  return (
    <img
      src={lockup ? BRAND_LOCKUP_SRC : BRAND_ICON_SRC}
      alt={lockup ? 'Gastromenu' : ''}
      aria-hidden={lockup ? undefined : true}
      className={className ?? (lockup ? 'h-24 w-auto object-contain' : 'h-10 w-10 object-contain')}
      decoding="async"
    />
  )
}
