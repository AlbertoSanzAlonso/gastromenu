import type { ReactNode } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/app/router'
import { LocaleProvider } from '@/i18n/locale'

interface AppProvidersProps {
  children?: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  if (children) {
    return (
      <HelmetProvider>
        <LocaleProvider>{children}</LocaleProvider>
      </HelmetProvider>
    )
  }

  return (
    <HelmetProvider>
      <LocaleProvider>
        <RouterProvider router={router} />
      </LocaleProvider>
    </HelmetProvider>
  )
}
