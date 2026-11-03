import { messages } from '@/i18n/messages'
import { useLocale } from '@/i18n/locale'

export function useMessages() {
  const { locale, setLocale } = useLocale()
  return { locale, setLocale, m: messages[locale] }
}
