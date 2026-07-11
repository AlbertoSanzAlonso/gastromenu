import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'outline' | 'outlineDark' | 'ghost'
  size?: 'md' | 'lg'
}

const variantStyles = {
  primary:
    'bg-ink text-cream border border-ink hover:bg-charcoal hover:border-gold-slide hover:text-cream hover:shadow-lg hover:shadow-gold-slide/30',
  outline:
    'bg-transparent text-ink border border-gold-slide hover:bg-gold-slide/10 hover:border-gold-slide hover:text-gold-slide hover:shadow-md hover:shadow-gold-slide/20',
  outlineDark:
    'bg-transparent text-cream border border-gold-slide/60 hover:bg-gold-slide/15 hover:border-gold-slide hover:text-gold-slide hover:shadow-md hover:shadow-gold-slide/25',
  ghost:
    'bg-transparent text-gold-slide hover:text-ink hover:bg-gold-slide/10',
}

const sizeStyles = {
  md: 'px-8 py-3 text-sm',
  lg: 'px-10 py-4 text-base',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center
        font-label font-medium uppercase tracking-[0.25em]
        cursor-pointer
        transition-all duration-400 ease-premium
        hover:scale-[1.04] active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
