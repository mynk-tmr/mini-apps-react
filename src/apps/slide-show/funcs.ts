import { useEffect, useRef, useState } from 'react'

export function useSlideShow(max: number) {
  const [active, setActive] = useState(0)
  return {
    active,
    max,
    prev: () => setActive((a) => (a === 0 ? max - 1 : a - 1)),
    next: () => setActive((a) => (a + 1) % max),
    goto: (i: number) => setActive(i),
  }
}

export function useAutoPlay(strategy: () => void, delay = 2000) {
  const id = useRef<number | null>(null)
  const [playing, setPlaying] = useState(false)
  useEffect(() => {
    if (!playing) {
      id.current = null
      return
    }
    if (id.current === null) strategy() //start immediately
    id.current = window.setTimeout(strategy, delay)
    return () => window.clearTimeout(id.current || 0)
  }, [playing, strategy, delay])

  return {
    playing,
    toggle: () => setPlaying((p) => !p),
  }
}
