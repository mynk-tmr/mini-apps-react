import { useState, useSyncExternalStore } from 'react'

export type Todo = {
  id: number
  title: string
  done: boolean
  edit: boolean
}

let todos = [] as Todo[]
const subs = new Set<() => void>()

function update(next: Todo[]) {
  todos = next
  for (const cb of subs) cb()
}

function subscribe(cb: () => void) {
  subs.add(cb)
  return () => subs.delete(cb)
}

//creates slices of the store
export function useTodoStore<T>(
  selector: (t: Todo[]) => T,
  eqFn: (neo: T, old: T) => boolean = Object.is,
) {
  const [$todos, setTodos] = useState(() => selector(todos))
  return useSyncExternalStore(subscribe, () => {
    const $next = selector(todos)
    if (!eqFn($next, $todos)) setTodos($next)
    return $todos
  })
}

let nextid = 0
export const todoCtr = {
  add(title: string) {
    update(
      todos.concat({
        id: ++nextid,
        title,
        done: false,
        edit: false,
      }),
    )
  },
  remove(id: number) {
    update(todos.filter((t) => t.id !== id))
  },
  toggleDone(id: number) {
    update(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  },
  toggleEdit(id: number) {
    update(todos.map((t) => (t.id === id ? { ...t, edit: !t.edit } : t)))
  },
  save(id: number, title: string) {
    update(todos.map((t) => (t.id === id ? { ...t, title, edit: false } : t)))
  },
}
