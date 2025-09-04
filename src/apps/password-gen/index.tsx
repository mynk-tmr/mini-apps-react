import { useState } from 'react'

export default {
  title: 'Password Generator',
  href: '/passwordgen',
  component: App,
}

function App() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
  function onClick() {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lower = 'abcdefghijklmnopqrstuvwxyz'
    const num = '0123456789'
    const sym = '!@#$%&*()-_=+[]{}|;:,.<>/?~`'
    const all = upper + lower + num + sym
    const pass: string[] = []
    const getrand = (arr: string) => arr[Math.floor(Math.random() * arr.length)]

    pass.push(getrand(upper))
    pass.push(getrand(lower))
    pass.push(getrand(num))
    pass.push(getrand(sym))

    for (let i = 0; i < length - 4; i++) {
      pass.push(getrand(all))
    }
    setPassword(pass.join(''))
  }
  return (
    <div className="grid gap-3">
      <input
        className="p-4 w-[80vw] text-sm sm:text-lg max-w-md border rounded-sm font-mono"
        value={password}
        placeholder="click generate"
        readOnly
      />
      <ClipboardButton password={password} />
      <button
        type="button"
        className="bg-sky-600 hover:bg-sky-700 px-4 py-2"
        onClick={onClick}
      >
        Generate
      </button>
      <input
        type="range"
        min="8"
        max="32"
        value={length}
        onChange={(e) => setLength(e.target.valueAsNumber)}
        className="accent-slate-300"
      />
      <span className="text-lg">
        Picked <b className="text-teal-500">{length}</b> length
      </span>
    </div>
  )
}

function ClipboardButton(props: { password: string }) {
  const [copied, setCopied] = useState(false)
  async function onClick() {
    try {
      await navigator.clipboard.writeText(props.password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
      alert('Failed to copy')
    }
  }
  return (
    <button
      type="button"
      disabled={copied || props.password.length === 0}
      className="border px-4 py-2 rounded-2xl bg-zinc-700 hover:bg-zinc-600 not-dark:text-white"
      onClick={onClick}
    >
      {copied ? '✅ Copied' : '🔑 Copy'}
    </button>
  )
}
