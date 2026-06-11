import type { ReactNode } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/app/router'

interface AppProvidersProps {
  children?: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  if (children) {
    return (
      <HelmetProvider>
        {children}
      </HelmetProvider>
    )
  }

  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}
