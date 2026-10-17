import { createContext, useContext } from 'react'

export type NoticeTone = 'ok' | 'error'

export interface NoticeApi {
  notify: (tone: NoticeTone, message: string) => void
}

export const NoticeContext = createContext<NoticeApi | null>(null)

export function useNotice() {
  const notice = useContext(NoticeContext)
  if (!notice) throw new Error('El aviso no está disponible en esta vista.')
  return notice
}
