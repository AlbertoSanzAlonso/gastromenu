import { Helmet } from 'react-helmet-async'
import { AdminAuthProvider } from '@/features/admin/AdminAuthProvider'
import { AdminShell } from '@/features/admin/components/AdminShell'
import { NoticeProvider } from '@/features/admin/NoticeProvider'
import { useAdminAuth } from '@/features/admin/session'
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage'

export function AdminLayout() {
  return (
    <AdminAuthProvider>
      <Helmet>
        <title>Backoffice | GASTROMENU</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AdminGate />
    </AdminAuthProvider>
  )
}

function AdminGate() {
  const { ready, mode, email } = useAdminAuth()

  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center bg-ink">
        <p className="font-label text-[11px] uppercase tracking-[0.32em] text-gold-slide">Cargando</p>
      </div>
    )
  }

  if (mode === 'remote' && !email) return <AdminLoginPage />

  return (
    <NoticeProvider>
      <AdminShell />
    </NoticeProvider>
  )
}
