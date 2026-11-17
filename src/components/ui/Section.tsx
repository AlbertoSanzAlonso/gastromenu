import type { ReactNode } from 'react'
import { Container } from '@/components/ui/Container'

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
  variant?: 'light' | 'dark' | 'beige'
  ariaLabel?: string
  watermarkSrc?: string
  edgeFade?: 'top' | 'bottom' | 'both'
}

const variantStyles = {
  light:
    'bg-beige-50/65 text-ink [&_.slide-heading]:text-ink [&_.slide-body]:text-stone',
  dark:
    'bg-ink text-cream [&_.slide-heading]:text-cream [&_.slide-body]:text-cream-muted',
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
  edgeFade,
}: SectionProps) {
  const fadeClass =
    variant === 'dark'
      ? watermarkSrc
        ? 'section-edge-fade'
        : ''
      : edgeFade === 'both'
        ? 'section-edge-fade'
        : edgeFade === 'top'
          ? 'section-edge-fade section-edge-fade-top'
          : edgeFade === 'bottom'
            ? 'section-edge-fade section-edge-fade-bottom'
            : ''

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`section-padding relative overflow-hidden ${variantStyles[variant]} ${fadeClass} ${className}`}
    >
      {watermarkSrc && variant === 'dark' && (
        <img
          src={watermarkSrc}
          alt=""
          aria-hidden
          decoding="async"
          className="section-hero-watermark"
        />
      )}
      <Container className="relative z-[2]">{children}</Container>
    </section>
  )
}
