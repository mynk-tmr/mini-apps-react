import { Store } from './store'

const data = {
  personal: [
    {
      fullname: 'Mayank Tomar',
      email: 'TtjXv@example.com',
      phone: '9876543210',
      address: 'New Delhi, India',
    },
  ],
  education: [
    {
      school: 'University of Delhi',
      degree: 'Bachelor of Science',
      startedIn: '2020-06',
      finishedOn: '2023-05',
      location: 'New Delhi, India',
    },
  ],
  work: [
    {
      place: 'Accenture',
      title: 'React Engineer',
      startedIn: '2023-11',
      finishedOn: '2025-07',
      location: 'New Delhi, India',
      description:
        'Designed and prototyped user interface patterns for various clients across diverse fields. Produced interactive documentation and tested & refactored legacy React class based code.',
    },
  ],
  font: 'Segoe UI' as 'Arial' | 'Segoe UI' | 'Cascadia Mono',
  color: '#1a34ff',
  invert: false,
  layout: 'flex-col' as 'flex-col' | 'flex-row' | 'flex-row-reverse',
}

export const $personal = new Store(data.personal)
export const $education = new Store(data.education)
export const $work = new Store(data.work)
export const $font = new Store(data.font)
export const $color = new Store(data.color)
export const $invert = new Store(data.invert)
export const $layout = new Store(data.layout)
