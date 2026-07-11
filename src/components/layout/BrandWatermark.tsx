import { BRAND_ICON_SRC } from '@/data/brand'

export function BrandWatermark() {
  return (
    <div aria-hidden className="brand-watermark">
      <img src={BRAND_ICON_SRC} alt="" decoding="async" />
    </div>
  )
}
