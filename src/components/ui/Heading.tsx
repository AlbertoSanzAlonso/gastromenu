import type { ReactNode } from 'react'

interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  children: ReactNode
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

const sizeStyles = {
  h1: 'text-5xl md:text-7xl lg:text-8xl font-display font-light tracking-tight leading-[1.05]',
  h2: 'text-4xl md:text-5xl lg:text-6xl font-display font-light tracking-tight',
  h3: 'text-2xl md:text-3xl font-display font-normal',
  h4: 'text-xl font-display font-medium',
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
        <p className="mt-6 text-stone font-ui text-sm uppercase tracking-[0.25em] font-light">
          {subtitle}
        </p>
      )}
    </header>
  )
}
