import { useId } from 'react'
import { useMessages } from '@/i18n/useMessages'
import type { Locale } from '@/i18n/locale'

interface LanguageSwitchProps {
  tone?: 'dark' | 'light'
  className?: string
}

const flagClass = 'lang-flag block h-3.5 w-[1.3rem]'

export function LanguageSwitch({ tone = 'dark', className = '' }: LanguageSwitchProps) {
  const { locale, setLocale, m } = useMessages()
  const options: { id: Locale; name: string; flag: 'es' | 'en' }[] = [
    { id: 'es', name: m.language.es, flag: 'es' },
    { id: 'en', name: m.language.en, flag: 'en' },
  ]

  return (
    <div role="group" aria-label={m.language.label} className={`flex items-center gap-2 ${className}`}>
      {options.map((option, index) => {
        const active = locale === option.id

        return (
          <span key={option.id} className="flex items-center gap-2">
            {index > 0 && (
              <span
                aria-hidden
                className={`h-3.5 w-px ${tone === 'light' ? 'bg-gold-dark/35' : 'bg-cream/35'}`}
              />
            )}
            <button
              type="button"
              lang={option.id}
              aria-pressed={active}
              aria-label={option.name}
              onClick={() => setLocale(option.id)}
              className={`relative cursor-pointer bg-transparent p-0 transition-opacity duration-400 ease-premium ${
                active ? 'opacity-100' : 'opacity-55 hover:opacity-80'
              } ${
                active
                  ? 'after:absolute after:right-0 after:-bottom-1.5 after:left-0 after:h-px after:bg-gold-slide'
                  : ''
              }`}
            >
              {option.flag === 'es' ? <SpainFlag /> : <UnitedKingdomFlag />}
            </button>
          </span>
        )
      })}
    </div>
  )
}

function SpainFlag() {
  return (
    <svg viewBox="0 0 30 20" aria-hidden className={flagClass}>
      <rect width="30" height="20" fill="#7a3b22" />
      <rect y="5" width="30" height="10" fill="#e2c48a" />
    </svg>
  )
}

function UnitedKingdomFlag() {
  const raw = useId().replace(/[^a-zA-Z0-9]/g, '')
  const bounds = `uk-${raw}`
  const saltire = `uk-s-${raw}`

  return (
    <svg viewBox="0 0 60 30" aria-hidden className={flagClass}>
      <defs>
        <clipPath id={bounds}>
          <path d="M0 0v30h60V0z" />
        </clipPath>
        <clipPath id={saltire}>
          <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${bounds})`}>
        <path d="M0 0v30h60V0z" fill="#3a2418" />
        <path d="M0 0l60 30m0-30L0 30" stroke="#f3ead8" strokeWidth="6" />
        <path
          d="M0 0l60 30m0-30L0 30"
          stroke="#a5683a"
          strokeWidth="4"
          clipPath={`url(#${saltire})`}
        />
        <path d="M30 0v30M0 15h60" stroke="#f3ead8" strokeWidth="10" />
        <path d="M30 0v30M0 15h60" stroke="#a5683a" strokeWidth="6" />
      </g>
    </svg>
  )
}
