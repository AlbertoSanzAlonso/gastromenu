import { useCallback, useState, type ReactNode } from 'react'
import { NoticeContext, type NoticeTone } from '@/features/admin/notice'

export function NoticeProvider({ children }: { children: ReactNode }) {
  const [notice, setNotice] = useState<{ tone: NoticeTone; message: string } | null>(null)
  const notify = useCallback((tone: NoticeTone, message: string) => {
    setNotice({ tone, message })
  }, [])

  return (
    <NoticeContext.Provider value={{ notify }}>
      {notice && (
        <div className="pointer-events-none fixed inset-x-0 top-4 z-[70] flex justify-center px-4">
          <div
            role="status"
            className={`pointer-events-auto flex w-full max-w-lg items-start justify-between gap-4 border px-4 py-3 shadow-lg ${
              notice.tone === 'ok'
                ? 'border-gold-slide/40 bg-beige-50 text-ink'
                : 'border-red-200 bg-white text-red-900'
            }`}
          >
            <p className="font-serif text-sm font-light">{notice.message}</p>
            <button
              type="button"
              onClick={() => setNotice(null)}
              className="font-label text-[10px] uppercase tracking-[0.16em]"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      {children}
    </NoticeContext.Provider>
  )
}
