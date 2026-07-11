import type { ReactNode } from 'react'

interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  children: ReactNode
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

const sizeStyles = {
  h1: 'text-4xl md:text-6xl lg:text-7xl font-brand font-semibold uppercase tracking-[0.1em] leading-[1.1]',
  h2: 'text-3xl md:text-4xl lg:text-5xl font-brand font-semibold uppercase tracking-[0.1em]',
  h3: 'text-2xl md:text-3xl font-brand font-medium uppercase tracking-[0.08em]',
  h4: 'text-xl font-brand font-medium uppercase tracking-[0.06em]',
}

export function Heading({
  as: Tag = 'h2',
  children,
  subtitle,
  align = 'left',
  className = '',
}: HeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : ''

  return (
    <header className={`mb-16 md:mb-20 max-w-4xl ${alignClass} ${className}`}>
      <Tag className={`${sizeStyles[Tag]} text-balance`}>
        {children}
      </Tag>
      {subtitle && (
        <p className="mt-6 brand-eyebrow text-[10px]">
          {subtitle}
        </p>
      )}
    </header>
  )
}
