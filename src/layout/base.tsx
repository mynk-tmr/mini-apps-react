import { Link } from 'wouter'
import { ThemeToggle } from '../apps/theme-toggle'

interface Props {
  h1: string
  body: React.ReactNode
}

export function BaseLayout(props: Props) {
  const icon = document.location.pathname === '/' ? '🏠' : '🔙'
  return (
    <main className="py-4 px-6">
      <header className="pb-4 border-b flex flex-wrap-reverse justify-between items-center">
        <Link href="/" className="hover:underline text-3xl font-extrabold">
          {props.h1} {icon}
        </Link>
        <ThemeToggle />
      </header>
      <section className="mt-4 w-fit mx-auto">{props.body}</section>
    </main>
  )
}
