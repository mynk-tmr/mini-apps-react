import { useSyncExternalStore } from 'react'

export class Store<T> {
  private subs: Set<() => void> = new Set()
  constructor(private state: T) {
    this.subscribe = this.subscribe.bind(this)
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
  update(updater: (t: T) => T) {
    this.state = updater(this.state)
    this.emit()
  }
  set(state: T) {
    this.state = state
    this.emit()
  }
}

//creates slices of the store
export function useStore<T, R>(store: Store<T>, selector: (t: T) => R) {
  return useSyncExternalStore(store.subscribe, () => selector(store.snapshot))
}
