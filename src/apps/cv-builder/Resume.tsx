import {
  $color,
  $education,
  $font,
  $invert,
  $layout,
  $personal,
  $work,
} from './data'
import { useStore } from './store'

export function Resume() {
  const layout = useStore($layout, (v) => v)
  const font = useStore($font, (v) => v)
  return (
    <section
      style={{ fontFamily: font, printColorAdjust: 'exact' }}
      className={`
      grow transition-all self-start sticky top-20 py-3 px-6
      bg-white border border-gray-300 rounded-md shadow-sm
      flex ${layout}
      print:border-none print:shadow-none print:fixed print:top-0 print:left-0 print:w-full
    `}
    >
      <Header />
      <Body />
    </section>
  )
}

function Header() {
  const invert = useStore($invert, (v) => v)
  const color = useStore($color, (v) => v)
  const { fullname, email, phone, address } = useStore($personal, ([v]) => v)
  return (
    <header
      style={{ background: color }}
      className={`grid text-center gap-y-4 py-3 min-w-48 ${invert ? 'text-stone-900' : 'text-white'}`}
    >
      <h1 className="text-4xl font-bold">{fullname}</h1>
      <section className="flex justify-evenly flex-wrap font-semibold *:break-all">
        <a href={`mailto:${email}`}>📧 {email}</a>
        <a href={`tel:${phone}`}>📞 {phone}</a>
        <a href={`https://maps.google.com/?q=${address}`}>🏠 {address}</a>
      </section>
    </header>
  )
}

function Body() {
  return (
    <section className="p-4 text-black grid gap-4">
      <InfoSection isEducation={true} />
      <InfoSection isEducation={false} />
    </section>
  )
}

function InfoSection(props: { isEducation: boolean }) {
  const education = useStore($education, (v) => v)
  const work = useStore($work, (v) => v)
  const data = props.isEducation ? education : work
  const color = useStore($color, (v) => v)
  const invert = useStore($invert, (v) => v)
  return (
    <article>
      <h2
        className={`text-center font-semibold text-xl ${
          invert ? 'bg-stone-900' : 'bg-stone-200'
        }`}
        style={{ color }}
      >
        {props.isEducation ? 'Education' : 'Work Experience'}
      </h2>
      {data.map((_, index) => (
        <StylishPara
          key={index}
          isEducation={props.isEducation}
          index={index}
        />
      ))}
    </article>
  )
}

function StylishPara(props: { isEducation: boolean; index: number }) {
  const education = useStore($education, (v) => v[props.index])
  const work = useStore($work, (v) => v[props.index])

  const atom = props.isEducation ? education : work
  const title = 'title' in atom ? atom.title : atom.degree
  const place = 'place' in atom ? atom.place : atom.school
  const description = 'description' in atom ? atom.description : undefined
  return (
    <p className="grid items-start grid-cols-[1fr_3fr] gap-4 p-4">
      <span className="grid gap-2">
        <i>
          {atom.startedIn} to {atom.finishedOn || 'present'}
        </i>
        <span>{atom.location}</span>
      </span>
      <span className="grid gap-1">
        <b>{title}</b>
        <i>{place}</i>
        {description && (
          <span className="bg-yellow-200/60 p-2">{description}</span>
        )}
      </span>
    </p>
  )
}
