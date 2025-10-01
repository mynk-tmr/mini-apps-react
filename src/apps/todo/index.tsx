import { useState } from 'react'
import { $todos, type Todo, useTodoStore } from './store'

export default {
  title: 'Todo App',
  href: '/todo',
  component: App,
}

function App() {
  return (
    <div>
      <AddTodo />
      <TodoList />
    </div>
  )
}

function AddTodo() {
  const [value, setValue] = useState('')
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        $todos.add(value)
        setValue('')
      }}
    >
      <input
        type="text"
        required
        className="p-2 border rounded-sm font-mono min-w-sm"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="border rounded-r-sm p-2">
        Add
      </button>
    </form>
  )
}

function TodoList() {
  const isEmpty = useTodoStore((todos) => todos.length === 0)
  if (isEmpty) {
    return (
      <section className="text-center mt-4">
        <p className="text-2xl font-bold">No Todos</p>
      </section>
    )
  }
  return <ShowTodos />
}

function ShowTodos() {
  const todoIds = useTodoStore((todos) => todos).map((t) => t.id)
  return (
    <ul className="grid gap-y-3 my-4">
      {todoIds.map((id) => (
        <TodoItem id={id} key={id} />
      ))}
    </ul>
  )
}

function TodoItem(props: { id: number }) {
  const todo = useTodoStore((todos) => todos.find((t) => t.id === props.id))
  if (!todo) throw new Error('Todo not found')

  return (
    <li className="flex border-b py-2 text-lg">
      {todo.edit ? <EditMode {...todo} /> : <ShowMode {...todo} />}
      <button type="button" onClick={() => $todos.remove(todo.id)}>
        🗑️
      </button>
    </li>
  )
}

function EditMode(props: Todo) {
  const [value, setValue] = useState(props.title)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        $todos.save(props.id, value)
      }}
      className="grow flex"
    >
      <input
        type="text"
        required
        className="p-2 border rounded-sm grow text-sm"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">✅</button>
    </form>
  )
}

function ShowMode(props: Todo) {
  return (
    <>
      <label className={`grow ${props.done ? 'line-through' : ''}`}>
        <input
          type="checkbox"
          className="size-4 mr-2"
          checked={props.done}
          onChange={() => $todos.toggleDone(props.id)}
        />
        {props.title}
      </label>
      <button type="button" onClick={() => $todos.toggleEdit(props.id)}>
        ✏️
      </button>
    </>
  )
}
