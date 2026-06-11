import type { ReactNode } from 'react'
import { Container } from '@/components/ui/Container'

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
  variant?: 'light' | 'dark' | 'beige'
  ariaLabel?: string
}

const variantStyles = {
  light: 'bg-beige-50 text-ink',
  dark: 'bg-ink text-beige-100',
  beige: 'bg-beige-100 text-ink',
}

export function Section({
  id,
  children,
  className = '',
  variant = 'light',
  ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`section-padding ${variantStyles[variant]} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  )
}
