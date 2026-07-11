import type { ReactNode } from 'react'
import { BrandDivider } from '@/components/ui/BrandDivider'

interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  children: ReactNode
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

const sizeStyles = {
  h1: 'text-4xl md:text-5xl lg:text-6xl',
  h2: 'text-3xl md:text-4xl lg:text-5xl',
  h3: 'text-2xl md:text-3xl',
  h4: 'text-xl md:text-2xl',
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
      <Tag className={`slide-heading ${sizeStyles[Tag]} text-balance`}>
        {children}
      </Tag>
      {subtitle && (
        <>
          <BrandDivider className={`mt-8 mb-6 ${align === 'center' ? '' : '!mx-0'}`} />
          <p className="slide-label">{subtitle}</p>
        </>
      )}
    </header>
  )
}
