import { useEffect, useState } from 'react'
import { readLocalData, subscribeLocalChanges } from '@/features/admin/localStore'
import { isSupabaseConfigured } from '@/lib/supabase/config'

let remoteCache: Record<string, string> | null = null
let remotePending: Promise<Record<string, string>> | null = null

function localContentMap() {
  const draft = readLocalData()
  if (!draft) return {}
  return Object.fromEntries(draft.content.map((row) => [row.key, row.value]))
}

function loadRemote(): Promise<Record<string, string>> {
  if (remoteCache) return Promise.resolve(remoteCache)
  if (!remotePending) {
    remotePending = import('@/lib/supabase/client')
      .then(({ supabase }) => supabase.from('site_content').select('key, value'))
      .then(({ data, error }) => {
        const next: Record<string, string> = {}
        if (!error && data) {
          for (const row of data as { key: string; value: string }[]) {
            next[row.key] = row.value
          }
        }
        remoteCache = next
        return next
      })
  }
  return remotePending
}

export function invalidateSiteContent() {
  remoteCache = null
  remotePending = null
}

export function useSiteContent() {
  const [entries, setEntries] = useState<Record<string, string> | null>(() =>
    isSupabaseConfigured ? null : localContentMap(),
  )

  useEffect(() => {
    if (isSupabaseConfigured) {
      let active = true
      const timer = window.setTimeout(() => {
        void loadRemote().then((map) => {
          if (active) setEntries(map)
        })
      }, 0)

      return () => {
        active = false
        window.clearTimeout(timer)
      }
    }

    return subscribeLocalChanges(() => setEntries(localContentMap()))
  }, [])

  function read(key: string, fallback: string) {
    const stored = entries?.[key]
    if (stored == null || stored.trim() === '') return fallback
    return stored
  }

  return { read }
}
