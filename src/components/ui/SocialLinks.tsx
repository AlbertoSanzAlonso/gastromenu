import { socialLinks, type SocialId } from '@/data/contact'

const iconPaths: Record<SocialId, string> = {
  facebook:
    'M14.5 8.5V6.8c0-.6.4-.8.8-.8H17V3.5h-2.4C12.2 3.5 11.5 5.2 11.5 6.6v1.9H9v2.6h2.5V21h3V11.1h2.2l.3-2.6h-2.5z',
  youtube:
    'M22.5 7.2a2.8 2.8 0 0 0-2-2C18.8 4.8 12 4.8 12 4.8s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2C1.1 8.9 1.1 12 1.1 12s0 3.1.4 4.8a2.8 2.8 0 0 0 2 2c1.7.4 8.5.4 8.5.4s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2c.4-1.7.4-4.8.4-4.8s0-3.1-.4-4.8zM9.8 15.5v-7l6.3 3.5-6.3 3.5z',
  linkedin:
    'M5.7 3.4a2 2 0 1 0 .02 4 2 2 0 0 0-.02-4zM4 9.2h3.4V21H4V9.2zm5.6 0h3.2v1.6h.1c.5-.9 1.6-1.8 3.3-1.8 3.5 0 4.2 2.3 4.2 5.3V21H17v-5.8c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9.6V9.2z',
  whatsapp:
    'M12 2.2A9.7 9.7 0 0 0 3.7 16.5L2.4 21.6l5.2-1.4A9.8 9.8 0 1 0 12 2.2zm5.6 13.7c-.2.7-1.4 1.3-1.9 1.4-.5.1-1.1.1-1.8-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.8-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 1-2.3.2-.3.6-.3.8-.3h.6c.2 0 .4 0 .7.5.3.6.9 2.1 1 2.3.1.2.1.3 0 .5-.1.2-.1.3-.3.5l-.4.5c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 2 1.1 1 2 1.3 2.3 1.4.3.1.5.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.3.1 1.7.8 2 .9.3.2.5.2.5.3.1.2.1.7-.1 1.4z',
  pinterest:
    'M12 2C6.5 2 2 6.5 2 12c0 4.2 2.6 7.7 6.2 9.2-.1-.8-.2-2 0-2.9.2-.8 1.4-5.6 1.4-5.6s-.3-.7-.3-1.7c0-1.6.9-2.8 2.1-2.8 1 0 1.4.7 1.4 1.6 0 1-.6 2.4-.9 3.7-.3 1.1.5 2 1.6 2 1.9 0 3.2-2.5 3.2-5.4 0-2.2-1.5-3.9-4.3-3.9-3.1 0-5 2.3-5 4.9 0 .9.3 1.9.7 2.4a.3.3 0 0 1 .1.3l-.3 1.2c0 .2-.2.3-.4.2-1.4-.6-2.1-2.3-2.1-4 0-3 2.5-6.6 7.4-6.6 3.9 0 6.5 2.8 6.5 5.9 0 4-2.2 7-5.5 7-1.1 0-2.1-.6-2.5-1.3l-.7 2.6c-.2.9-.8 2.1-1.2 2.8A10 10 0 0 0 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z',
}

interface SocialLinksProps {
  className?: string
}

export function SocialLinks({ className = '' }: SocialLinksProps) {
  return (
    <ul className={`flex flex-nowrap items-center gap-2 ${className}`}>
      {socialLinks.map((item) => {
        const icon = (
          <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-current">
            <path d={iconPaths[item.id]} />
          </svg>
        )
        const frame =
          'flex h-9 w-9 items-center justify-center border border-gold-slide/35 text-gold-slide transition-colors duration-300'

        return (
          <li key={item.id}>
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className={`${frame} hover:border-gold-slide hover:bg-gold-slide hover:text-ink`}
              >
                {icon}
              </a>
            ) : (
              <span className={frame} role="img" aria-label={item.label} title={item.label}>
                {icon}
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
