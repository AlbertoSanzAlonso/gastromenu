import { useCallback, useEffect, useState } from 'react'
import { errorMessage } from '@/features/admin/errors'

export function useAdminList<T>(load: () => Promise<T>, initial: T) {
  const [data, setData] = useState(initial)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setData(await load())
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [load])

  useEffect(() => {
    let active = true
    load()
      .then((next) => {
        if (!active) return
        setData(next)
        setError(null)
      })
      .catch((err: unknown) => {
        if (!active) return
        setError(errorMessage(err))
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [load])

  return { data, loading, error, reload }
}
