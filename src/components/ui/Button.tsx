import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'md' | 'lg'
}

const variantStyles = {
  primary:
    'bg-ink text-beige-100 hover:bg-charcoal border border-ink',
  outline:
    'bg-transparent text-ink border border-ink/20 hover:border-gold hover:text-gold-dark',
  ghost:
    'bg-transparent text-ink hover:text-gold-dark',
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
        font-ui font-light uppercase tracking-[0.2em]
        transition-all duration-400 ease-premium
        disabled:opacity-50 disabled:cursor-not-allowed
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
