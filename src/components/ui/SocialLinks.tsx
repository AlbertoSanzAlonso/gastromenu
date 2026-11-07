import { socialLinks, type SocialId } from '@/data/contact'

const iconPaths: Record<SocialId, string> = {
  instagram:
    'M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.3.5.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.5.4 1.1.5 2.3.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.8-.5 2.3a3.8 3.8 0 0 1-.9 1.4c-.4.4-.8.7-1.4.9-.5.2-1.1.4-2.3.5-1.3.1-1.6.1-4.9.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.3-2.3-.5a3.8 3.8 0 0 1-1.4-.9 3.8 3.8 0 0 1-.9-1.4c-.2-.5-.4-1.1-.5-2.3-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.3-1.8.5-2.3.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.5-.2 1.1-.4 2.3-.5 1.2-.1 1.6-.1 4.8-.1zm0 1.8c-3.2 0-3.5 0-4.7.1-1 .1-1.6.2-2 .4-.5.2-.8.4-1.1.7-.3.3-.6.6-.7 1.1-.2.4-.4 1-.4 2-.1 1.2-.1 1.5-.1 4.7s0 3.5.1 4.7c.1 1 .2 1.6.4 2 .2.5.4.8.7 1.1.3.3.6.6 1.1.7.4.2 1 .4 2 .4 1.2.1 1.5.1 4.7.1s3.5 0 4.7-.1c1-.1 1.6-.2 2-.4.5-.2.8-.4 1.1-.7.3-.3.6-.6.7-1.1.2-.4.4-1 .4-2 .1-1.2.1-1.5.1-4.7s0-3.5-.1-4.7c-.1-1-.2-1.6-.4-2a3 3 0 0 0-.7-1.1 3 3 0 0 0-1.1-.7c-.4-.2-1-.4-2-.4-1.2-.1-1.5-.1-4.7-.1zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 1.8a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2zm6.3-2.2a1.2 1.2 0 1 1 0 2.3 1.2 1.2 0 0 1 0-2.3z',
  whatsapp:
    'M12 2.2A9.7 9.7 0 0 0 3.7 16.5L2.4 21.6l5.2-1.4A9.8 9.8 0 1 0 12 2.2zm5.6 13.7c-.2.7-1.4 1.3-1.9 1.4-.5.1-1.1.1-1.8-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.8-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 1-2.3.2-.3.6-.3.8-.3h.6c.2 0 .4 0 .7.5.3.6.9 2.1 1 2.3.1.2.1.3 0 .5-.1.2-.1.3-.3.5l-.4.5c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 2 1.1 1 2 1.3 2.3 1.4.3.1.5.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.3.1 1.7.8 2 .9.3.2.5.2.5.3.1.2.1.7-.1 1.4z',
}

interface SocialLinksProps {
  className?: string
  compact?: boolean
}

export function SocialLinks({ className = '', compact = false }: SocialLinksProps) {
  return (
    <ul className={`flex flex-nowrap items-center gap-2 ${className}`}>
      {socialLinks.map((item) => {
        const frame = compact
          ? 'flex h-8 w-8 items-center justify-center border border-gold-slide/30 text-gold-slide/80 transition-colors duration-300 hover:text-gold-slide'
          : 'flex h-9 w-9 items-center justify-center border border-gold-slide/35 text-gold-slide transition-colors duration-300'

        return (
          <li key={item.id}>
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              className={`${frame} hover:border-gold-slide hover:bg-gold-slide hover:text-ink`}
            >
              <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-current">
                <path d={iconPaths[item.id]} />
              </svg>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
