import { useEffect, useState } from 'react'

export default {
  title: 'Stopwatch',
  href: '/stopwatch',
  component: App,
}

function useWatch(step: number, duration: number) {
  const [time, setTime] = useState(0)
  const [paused, setPaused] = useState(true)

  useEffect(() => {
    if (paused) return
    if (time === 0) setTime(time + step)
    const id = setTimeout(() => setTime(time + step), step)
    return () => clearTimeout(id)
  }, [time, paused, step])

  useEffect(() => {
    if (time >= duration) setPaused(true)
  }, [time, duration])

  return {
    time,
    paused,
    toggle: () => setPaused((p) => !p),
    reset: () => {
      setPaused(true)
      setTime(0)
    },
  }
}

function App() {
  const [duration, setDuration] = useState(10)
  const { time, paused, toggle, reset } = useWatch(20, duration * 1000)
  const rem = duration * 1000 - time
  return (
    <div className="grid gap-6">
      <SelectTime
        duration={duration}
        setDuration={setDuration}
        disabled={time !== 0}
      />
      <Time time={rem} />
      <div className="flex gap-4 items-center">
        {rem !== 0 && (
          <button type="button" onClick={toggle} className="bg-sky-600 p-2">
            {paused ? 'Start' : 'Pause'}
          </button>
        )}
        <button type="button" onClick={reset} className="bg-rose-600 p-2">
          Reset
        </button>
        <span className="text-2xl font-mono">{rem <= 0 && '✅ Done'}</span>
      </div>
    </div>
  )
}

function Time(props: { time: number }) {
  const visual = new Date(props.time).toISOString().slice(-12, -2)
  const [hr, min, sec, ms] = visual.split(/[:.]/)
  const show = `${hr} hr ${min} min ${sec} sec ${ms} ms`
  return (
    <div>
      <small className="block pb-1 mb-1 border-b">Time Remaining</small>
      <time className="text-3xl font-mono block mb-4">{show}</time>
    </div>
  )
}

function SelectTime(props: {
  duration: number
  setDuration: (d: number) => void
  disabled: boolean
}) {
  return (
    <fieldset
      disabled={props.disabled}
      className={`${props.disabled ? 'opacity-50' : ''}`}
    >
      Enter Duration:
      <input
        type="number"
        min={0}
        max={60 * 60 * 24}
        step={1}
        className="ml-3 px-2 py-1 border"
        value={props.duration}
        onChange={(e) => props.setDuration(e.target.valueAsNumber || 0)}
      />
    </fieldset>
  )
}
