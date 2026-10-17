import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { translateAuthError } from '@/features/admin/errors'
import { createRepository } from '@/features/admin/repository'
import { AdminSessionContext } from '@/features/admin/session'
import { isSupabaseConfigured, supabase } from '@/lib/supabase/client'

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const mode: 'local' | 'remote' = isSupabaseConfigured ? 'remote' : 'local'
  const [ready, setReady] = useState(mode === 'local')
  const [email, setEmail] = useState<string | null>(null)
  const repo = useMemo(() => createRepository(mode), [mode])

  useEffect(() => {
    if (mode === 'local') return

    let active = true
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setEmail(data.session?.user.email ?? null)
      setReady(true)
    })

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user.email ?? null)
      setReady(true)
    })

    return () => {
      active = false
      data.subscription.unsubscribe()
    }
  }, [mode])

  const signIn = useCallback(async (nextEmail: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: nextEmail.trim(),
      password,
    })
    if (error) return translateAuthError(error.message)
    return null
  }, [])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
  }, [])

  const value = useMemo(
    () => ({ mode, ready, email, repo, signIn, signOut }),
    [mode, ready, email, repo, signIn, signOut],
  )

  return <AdminSessionContext.Provider value={value}>{children}</AdminSessionContext.Provider>
}
