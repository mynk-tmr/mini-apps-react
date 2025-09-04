import { Link, Route, Switch } from 'wouter'
import { routes } from './apps'
import { BaseLayout } from './layout/base'

function Links() {
  return routes.map((route) => (
    <Link
      key={route.href}
      href={route.href}
      className="text-sky-500 font-medium hover:underline text-lg before:content-['🔗']"
    >
      {route.title}
    </Link>
  ))
}

export default function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      {routes.map((route) => (
        <Route key={route.href} path={route.href}>
          <BaseLayout h1={route.title} body={<route.component />} />
        </Route>
      ))}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}

function Home() {
  return (
    <BaseLayout
      h1="Showcase"
      body={
        <section className="flex flex-wrap gap-4">
          <Links />
        </section>
      }
    />
  )
}

function NotFound() {
  return (
    <BaseLayout
      h1="404 Error"
      body={
        <p>
          The page you are looking for does not exist <br /> Viewing{' '}
          <b>{window.location.pathname}</b>
        </p>
      }
    />
  )
}
