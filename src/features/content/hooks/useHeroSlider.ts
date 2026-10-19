import { useCallback, useEffect, useRef, useState } from 'react'

export const HERO_SLIDE_MS = 4800
export const HERO_CROSSFADE_MS = 1600

export function useHeroSlider(length: number) {
  const [index, setIndex] = useState(0)
  const [hidden, setHidden] = useState(() => document.hidden)
  const [reduced, setReduced] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const remaining = useRef(HERO_SLIDE_MS)
  const token = useRef(0)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(media.matches)
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const sync = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', sync)
    return () => document.removeEventListener('visibilitychange', sync)
  }, [])

  const paused = hidden || reduced || length < 2
  const activeIndex = length === 0 ? 0 : index % length

  const goTo = useCallback(
    (next: number) => {
      if (length < 1) return
      token.current += 1
      remaining.current = HERO_SLIDE_MS
      setIndex(((next % length) + length) % length)
    },
    [length],
  )

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])

  useEffect(() => {
    if (paused || length < 2) return
    const myToken = token.current
    const wait = remaining.current
    const start = performance.now()
    const id = window.setTimeout(() => {
      token.current += 1
      remaining.current = HERO_SLIDE_MS
      setIndex((current) => (current + 1) % length)
    }, wait)
    return () => {
      window.clearTimeout(id)
      if (token.current === myToken) {
        remaining.current = Math.max(160, wait - (performance.now() - start))
      }
    }
  }, [activeIndex, paused, length])

  return {
    index: activeIndex,
    paused,
    reduced,
    next,
    prev,
  }
}
