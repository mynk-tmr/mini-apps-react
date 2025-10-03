import Accordion from './Accordian'
import { $education, $personal, $work } from './data'
import { useStore } from './store'

function PersonalForm() {
  const personalData = useStore($personal, (v) => v)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    $personal.update((v) => ({ ...v, [name]: value }))
  }
  const fields = [
    { type: 'text', name: 'fullname', placeholder: 'Full Name' },
    { type: 'email', name: 'email', placeholder: 'Email' },
    { type: 'tel', name: 'phone', placeholder: 'Phone' },
    { type: 'text', name: 'address', placeholder: 'Address' },
  ] as (React.ComponentProps<'input'> & { name: keyof typeof personalData })[]
  return (
    <Accordion title="😄 Personal Details">
      {fields.map(({ type, name, placeholder }) => (
        <input
          key={name}
          type={type}
          name={name}
          placeholder={placeholder}
          value={personalData[name]}
          onChange={onChange}
          className="p-4 my-1 border rounded-sm font-mono w-full placeholder:capitalize"
        />
      ))}
    </Accordion>
  )
}

function EducationForm() {
  const educations = useStore($education, (v) => v)
  const save = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target
    $education.update((v) =>
      v.map((v, i) => (i === index ? { ...v, [name]: value } : v)),
    )
  }
  const fields = [
    { type: 'text', name: 'school', placeholder: 'School' },
    { type: 'text', name: 'degree', placeholder: 'Degree' },
    { type: 'text', name: 'location', placeholder: 'Location' },
    { type: 'text', name: 'startedIn', placeholder: 'Started In' },
    { type: 'text', name: 'finishedOn', placeholder: 'Finished On' },
  ] as (React.ComponentProps<'input'> & {
    name: keyof (typeof educations)[number]
  })[]

  const onAdd = () => {
    $education.update((v) => [
      ...v,
      { school: '', degree: '', location: '', startedIn: '', finishedOn: '' },
    ])
  }

  const onDelete = (index: number) => {
    $education.update((v) => v.filter((_, i) => i !== index))
  }

  return educations.map((education, i) => (
    <Accordion
      key={i}
      title="👩‍🎓 Education"
      onAdd={onAdd}
      onDelete={educations.length > 1 ? () => onDelete(i) : undefined}
    >
      {fields.map(({ type, name, placeholder }) => (
        <input
          key={name}
          type={type}
          name={name}
          placeholder={placeholder}
          value={education[name]}
          onChange={(e) => save(e, i)}
          className="p-4 my-1 border rounded-sm font-mono w-full placeholder:capitalize"
        />
      ))}
    </Accordion>
  ))
}

function WorkForm() {
  const workDatas = useStore($work, (v) => v)
  const save = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const { name, value } = e.target
    $work.update((v) =>
      v.map((v, i) => (i === index ? { ...v, [name]: value } : v)),
    )
  }
  const fields = [
    { type: 'text', name: 'place', placeholder: 'Company' },
    { type: 'text', name: 'title', placeholder: 'Position' },
    { type: 'text', name: 'location', placeholder: 'Location' },
    { type: 'text', name: 'startedIn', placeholder: 'Started In' },
    { type: 'text', name: 'finishedOn', placeholder: 'Finished On' },
  ] as (React.ComponentProps<'input'> & {
    name: keyof (typeof workDatas)[number]
  })[]

  const onAdd = () => {
    $work.update((v) => [
      ...v,
      {
        place: '',
        title: '',
        location: '',
        startedIn: '',
        finishedOn: '',
        description: '',
      },
    ])
  }

  const onDelete = (index: number) => {
    $work.update((v) => v.filter((_, i) => i !== index))
  }
  return workDatas.map((workData, i) => (
    <Accordion
      key={i}
      title="💼 Work Experience"
      onAdd={onAdd}
      onDelete={workDatas.length > 1 ? () => onDelete(i) : undefined}
    >
      {fields.map(({ type, name, placeholder }) => (
        <input
          key={name}
          type={type}
          name={name}
          placeholder={placeholder}
          value={workData[name]}
          onChange={(e) => save(e, i)}
          className="p-4 my-1 border rounded-sm font-mono w-full placeholder:capitalize"
        />
      ))}
      <textarea
        name="description"
        placeholder="Description"
        value={workData.description}
        onChange={(e) => save(e, i)}
        rows={6}
        className="p-4 my-1 border rounded-sm font-mono w-full placeholder:capitalize"
      />
    </Accordion>
  ))
}

export function ResumeFormHolder() {
  return (
    <div className="flex flex-col gap-8 print:hidden">
      <PersonalForm />
      <EducationForm />
      <WorkForm />
    </div>
  )
}
