import { useState } from 'react'

interface AccordionProps {
  title: React.ReactNode
  children: React.ReactNode
  onAdd?: () => void
  onDelete?: () => void
}

export default function Accordion({
  title,
  children,
  onAdd,
  onDelete,
}: AccordionProps) {
  const [open, setOpen] = useState(true)
  const toggle = () => setOpen(!open)

  return (
    <article className="relative p-3 rounded-md max-w-prose border">
      {/* Header */}
      <h2 className="mb-3 text-xl font-bold">{title}</h2>

      {/* Body */}
      {open && <div>{children}</div>}

      {onDelete && (
        <div className="flex justify-end">
          <button
            onClick={onDelete}
            type="button"
            className="bg-red-400 px-4 py-1 rounded-md mt-2"
          >
            Delete
          </button>
        </div>
      )}

      {/* Menu */}
      <menu className="absolute top-5 right-3 flex items-center">
        {onAdd && (
          <button type="button" onClick={onAdd}>
            ➕
          </button>
        )}
        <button
          type="button"
          onClick={toggle}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        >
          ▼
        </button>
      </menu>
    </article>
  )
}
