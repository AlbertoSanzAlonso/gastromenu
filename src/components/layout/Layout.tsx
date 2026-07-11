import { Outlet } from 'react-router-dom'
import { BrandWatermark } from '@/components/layout/BrandWatermark'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <BrandWatermark />
      <Header />
      <main className="relative z-10 flex-1 pt-20 md:pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
