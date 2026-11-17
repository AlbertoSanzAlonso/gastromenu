import { lazy, Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { BrandWatermark } from '@/components/layout/BrandWatermark'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'

const CookieNotice = lazy(() =>
  import('@/components/layout/CookieNotice').then((module) => ({
    default: module.CookieNotice,
  })),
)
const FloatingActions = lazy(() =>
  import('@/components/layout/FloatingActions').then((module) => ({
    default: module.FloatingActions,
  })),
)

export function Layout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView()
        return
      }
    }

    window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <div className="min-h-screen flex flex-col">
      <BrandWatermark />
      <Header />
      <main className="relative z-10 flex-1 pt-20 md:pt-24">
        <Outlet />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <CookieNotice />
        <FloatingActions />
      </Suspense>
    </div>
  )
}
