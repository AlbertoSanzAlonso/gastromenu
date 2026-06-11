import { useEffect, useState } from 'react'
import { fallbackTeam } from '@/data/fallback'
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client'
import type { TeamMember } from '@/lib/supabase/types'

export function useTeam() {
  const [members, setMembers] = useState<TeamMember[]>(fallbackTeam)
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!isSupabaseConfigured) return

    async function fetchTeam() {
      const { data, error } = await supabase!
        .from('team_members')
        .select('*')
        .order('sort_order')

      if (!error && data?.length) setMembers(data as TeamMember[])
      setLoading(false)
    }

    fetchTeam()
  }, [])

  return { members, loading }
}
