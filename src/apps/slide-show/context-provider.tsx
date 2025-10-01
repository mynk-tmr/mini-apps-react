import { createContext, use, useEffect, useRef, useState } from 'react'

interface Context {
  active: number
  max: number
  images: string[]
  prev: () => void
  next: () => void
  goto: (i: number) => void
}

const Context = createContext<Context | null>(null)

export function useSlideShow() {
  const ctx = use(Context)
  if (!ctx) throw new Error('No SlideShow Provider')
  return ctx
}

export function SlideShowProvider(props: {
  children: React.ReactNode
  images: string[]
}) {
  const [active, setActive] = useState(0)
  const max = props.images.length
  return (
    <Context
      value={{
        active,
        max,
        images: props.images,
        prev: () => setActive((a) => (a === 0 ? max - 1 : a - 1)),
        next: () => setActive((a) => (a + 1) % max),
        goto: (i) => setActive(i),
      }}
    >
      {props.children}
    </Context>
  )
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
