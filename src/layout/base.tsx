import { Link } from 'wouter'
import { ThemeToggle } from '../apps/theme-toggle'

interface Props {
  h1: string
  body: React.ReactNode
}

export function BaseLayout(props: Props) {
  const basepath = '/mini-apps-react/'
  const icon = document.location.pathname === basepath ? '🏠' : '🔙'
  return (
    <main className="py-4 px-6">
      <title>{props.h1}</title>
      <header className="pb-4 border-b flex flex-wrap-reverse justify-between items-center">
        <Link
          href={basepath}
          className="hover:underline text-3xl font-extrabold"
        >
          {props.h1} {icon}
        </Link>
        <ThemeToggle />
      </header>
      <section className="mt-4 w-fit mx-auto">{props.body}</section>
    </main>
  )
}
