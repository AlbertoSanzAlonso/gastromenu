import { createContext, useContext } from 'react'
import type { AdminRepository } from '@/features/admin/repository'

export interface AdminSessionValue {
  mode: 'local' | 'remote'
  ready: boolean
  email: string | null
  repo: AdminRepository
  signIn: (email: string, password: string) => Promise<string | null>
  signOut: () => Promise<void>
}

export const AdminSessionContext = createContext<AdminSessionValue | null>(null)

export function useAdminAuth() {
  const session = useContext(AdminSessionContext)
  if (!session) throw new Error('El backoffice no está disponible en esta vista.')
  return session
}
