import { BRAND_ICON_SRC, BRAND_LOCKUP_SRC } from '@/data/brand'

interface BrandLogoProps {
  className?: string
  variant?: 'mark' | 'lockup'
  fetchPriority?: 'high' | 'low' | 'auto'
  decoding?: 'async' | 'sync' | 'auto'
}

export function BrandLogo({
  className,
  variant = 'mark',
  fetchPriority = 'auto',
  decoding = 'async',
}: BrandLogoProps) {
  const lockup = variant === 'lockup'

  return (
    <img
      src={lockup ? BRAND_LOCKUP_SRC : BRAND_ICON_SRC}
      alt={lockup ? 'GastroMenu Premium' : ''}
      aria-hidden={lockup ? undefined : true}
      className={className ?? (lockup ? 'h-24 w-auto object-contain' : 'h-10 w-10 object-contain')}
      width={lockup ? 320 : 44}
      height={lockup ? 80 : 44}
      decoding={decoding}
      fetchPriority={fetchPriority}
    />
  )
}
