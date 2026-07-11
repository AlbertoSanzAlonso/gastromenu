import type { ReactNode } from 'react'

interface GoldTextProps {
  children: ReactNode
  as?: 'span' | 'p' | 'em'
  className?: string
}

export function GoldText({
  children,
  as: Tag = 'span',
  className = '',
}: GoldTextProps) {
  return (
    <Tag className={`brand-accent ${className}`}>
      {children}
    </Tag>
  )
}
