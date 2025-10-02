import { Customiser } from './Customiser'
import { ResumeFormHolder } from './Forms'
import { Resume } from './Resume'

export default {
  title: 'CV Builder',
  href: '/cv-builder',
  component: App,
}

function App() {
  return (
    <div>
      <Customiser />
      <div className="grid grid-cols-[1fr_2fr] gap-4">
        <ResumeFormHolder />
        <Resume />
      </div>
    </div>
  )
}
