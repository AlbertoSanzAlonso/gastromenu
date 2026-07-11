import { BRAND_ICON_SRC } from '@/data/brand'

interface BrandLogoProps {
  className?: string
}

export function BrandLogo({ className = 'h-10 w-10 object-contain' }: BrandLogoProps) {
  return (
    <img
      src={BRAND_ICON_SRC}
      alt=""
      aria-hidden
      className={className}
      decoding="async"
    />
  )
}
