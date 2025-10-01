import { useSyncExternalStore } from 'react'

export type Todo = {
  id: number
  title: string
  done: boolean
  edit: boolean
}

class Store {
  private subs: Set<() => void> = new Set()
  private state: Todo[]
  constructor() {
    this.state = JSON.parse(localStorage.getItem('todos') || '[]')
    this.subscribe = this.subscribe.bind(this)
    this.subscribe(() =>
      localStorage.setItem('todos', JSON.stringify(this.state)),
    )
  }
  get snapshot() {
    return this.state
  }
  subscribe(cb: () => void) {
    this.subs.add(cb)
    return () => this.subs.delete(cb)
  }
  emit() {
    for (const cb of this.subs) cb()
  }
  add(title: string) {
    const id = Date.now()
    this.state = [...this.state, { id, title, done: false, edit: false }]
    this.emit()
  }
  remove(id: number) {
    this.state = this.state.filter((t) => t.id !== id)
    this.emit()
  }
  change(updater: (t: Todo) => Todo, id: number) {
    this.state = this.state.map((t) => (t.id === id ? updater(t) : t))
    this.emit()
  }
  toggleDone(id: number) {
    this.change((t) => ({ ...t, done: !t.done }), id)
  }
  toggleEdit(id: number) {
    this.change((t) => ({ ...t, edit: !t.edit }), id)
  }
  save(id: number, title: string) {
    this.change((t) => ({ ...t, title, edit: false }), id)
  }
}

export const $todos = new Store()

//creates slices of the store
export function useTodoStore<T>(selector: (t: Todo[]) => T) {
  return useSyncExternalStore($todos.subscribe, () => selector($todos.snapshot))
}
