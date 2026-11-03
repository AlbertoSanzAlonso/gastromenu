import { useMessages } from '@/i18n/useMessages'
import type { Locale } from '@/i18n/locale'

interface LanguageSwitchProps {
  tone?: 'dark' | 'light'
  className?: string
}

export function LanguageSwitch({ tone = 'dark', className = '' }: LanguageSwitchProps) {
  const { locale, setLocale, m } = useMessages()
  const options: { id: Locale; label: string; name: string }[] = [
    { id: 'es', label: 'ES', name: m.language.es },
    { id: 'en', label: 'EN', name: m.language.en },
  ]

  return (
    <div role="group" aria-label={m.language.label} className={`flex items-center gap-2.5 ${className}`}>
      {options.map((option, index) => {
        const active = locale === option.id
        const color = active
          ? tone === 'light'
            ? 'text-gold-dark'
            : 'text-gold-slide'
          : tone === 'light'
            ? 'text-stone hover:text-ink'
            : 'text-cream/45 hover:text-cream'

        return (
          <span key={option.id} className="flex items-center gap-2.5">
            {index > 0 && (
              <span
                aria-hidden
                className={`h-3 w-px ${tone === 'light' ? 'bg-gold-dark/35' : 'bg-cream/35'}`}
              />
            )}
            <button
              type="button"
              lang={option.id}
              aria-pressed={active}
              aria-label={option.name}
              onClick={() => setLocale(option.id)}
              className={`relative cursor-pointer bg-transparent p-0 font-label text-[10px] font-medium uppercase tracking-[0.28em] transition-colors duration-400 ease-premium ${color} ${
                active
                  ? 'after:absolute after:right-0 after:-bottom-1.5 after:left-0 after:h-px after:bg-current'
                  : ''
              }`}
            >
              {option.label}
            </button>
          </span>
        )
      })}
    </div>
  )
}
