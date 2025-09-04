import { Link, Route, Switch } from 'wouter'
import { routes } from './apps'
import { BaseLayout } from './layout/base'

export default function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      {routes.map((route) => (
        <Route key={route.href} path={route.href}>
          <BaseLayout h1={route.title} body={<route.component />} />
        </Route>
      ))}
      <Route component={NotFound} />
    </Switch>
  )
}

function Box(props: { route: (typeof routes)[number] }) {
  const route = props.route
  return (
    <Link href={route.href} className="border p-4 m-1 block">
      {route.title}
    </Link>
  )
}

function Home() {
  return (
    <BaseLayout
      h1="Showcase"
      body={
        <div className="grid w-[80vw] grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
          {routes.map((route) => (
            <Box key={route.href} route={route} />
          ))}
        </div>
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
