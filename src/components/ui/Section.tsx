import type { ReactNode } from 'react'
import { Container } from '@/components/ui/Container'

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
  variant?: 'light' | 'dark' | 'beige'
  ariaLabel?: string
  watermarkSrc?: string
  watermarkAlign?: 'start' | 'end'
}

const variantStyles = {
  light:
    'bg-beige-50/65 text-ink [&_.slide-heading]:text-ink [&_.slide-body]:text-stone',
  dark:
    'bg-ink/78 text-cream [&_.slide-heading]:text-cream [&_.slide-body]:text-cream-muted',
  beige:
    'bg-beige-100/65 text-ink [&_.slide-heading]:text-ink [&_.slide-body]:text-stone',
}

export function Section({
  id,
  children,
  className = '',
  variant = 'light',
  ariaLabel,
  watermarkSrc,
  watermarkAlign = 'end',
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`section-padding relative overflow-hidden ${variantStyles[variant]} ${className}`}
    >
      {watermarkSrc && (
        <img
          src={watermarkSrc}
          alt=""
          aria-hidden
          decoding="async"
          className={`section-hero-watermark ${
            watermarkAlign === 'start' ? 'section-hero-watermark--start' : 'section-hero-watermark--end'
          } ${variant === 'dark' ? 'section-hero-watermark--dark' : ''}`}
        />
      )}
      <Container className="relative z-[1]">{children}</Container>
    </section>
  )
}
