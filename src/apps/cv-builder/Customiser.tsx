import { $color, $font, $invert, $layout } from './data'
import { useStore } from './store'

export function Customiser() {
  return (
    <div className="m-4 flex justify-end items-center gap-4 *:font-semibold sticky top-4 print:hidden">
      <InvertColors />
      <PickColor />
      <LayoutPicker />
      <FontPicker />
      <PrintResume />
      <Reset />
    </div>
  )
}

function InvertColors() {
  const invert = useStore($invert, (v) => v)
  return (
    <label>
      <input
        type="checkbox"
        checked={invert}
        onChange={() => $invert.update((v) => !v)}
        className="accent-fuchsia-500"
      />{' '}
      Invert Color
    </label>
  )
}

function PickColor() {
  const color = useStore($color, (v) => v)
  return (
    <label className="flex gap-2 items-center">
      <input
        type="color"
        className="size-6 rounded-full"
        value={color}
        onChange={(e) => $color.update(() => e.target.value)}
      />
      Accent
    </label>
  )
}

function LayoutPicker() {
  const layout = useStore($layout, (v) => v)
  return (
    <select
      className="border border-gray-300 rounded-md px-2 py-1 *:text-sm *:text-stone-800"
      value={layout}
      /* @ts-ignore */
      onChange={(e) => $layout.update(() => e.target.value)}
    >
      <option value="flex-col">Top to Bottom</option>
      <option value="flex-row">Left to Right</option>
      <option value="flex-row-reverse">Right to Left</option>
    </select>
  )
}

function FontPicker() {
  const font = useStore($font, (v) => v)
  return (
    <div>
      <input
        type="search"
        list="fonts"
        placeholder="Font"
        value={font}
        // @ts-ignore
        onChange={(e) => $font.update(() => e.target.value)}
        className="border border-gray-300 rounded-md px-2 py-1 *:text-sm *:text-stone-800"
      />
      <datalist id="fonts">
        <option value="Segoe UI">Segoe UI</option>
        <option value="Arial">Arial</option>
        <option value="Cascadia Mono">Cascadia Mono</option>
      </datalist>
    </div>
  )
}

function PrintResume() {
  return (
    <button
      type="button"
      className="bg-green-600 p-2 rounded-sm"
      onClick={() => window.print()}
    >
      Print 🖨️
    </button>
  )
}

function Reset() {
  return (
    <button
      type="button"
      className="bg-rose-600 p-2 rounded-sm"
      onClick={() => window.location.reload()}
    >
      Reset
    </button>
  )
}
