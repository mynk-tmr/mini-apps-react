import { useState } from 'react'

export default {
  title: 'Forms',
  href: '/forms',
  component: App,
}

function App() {
  const tw_input =
    'p-4 border rounded-sm font-mono min-w-xs placeholder:capitalize'

  const tw_buton = 'p-2 bg-sky-600 hover:bg-sky-700'

  const number_regex = /^[0-9]+$/

  const { register, errors, handleSubmit, reset } = useForm({
    fields: {
      name: '',
      price: '',
      discount: '',
    },
    validator: (fields, nextErrors) => {
      if (!fields.name) {
        nextErrors.name = 'Name is required'
      }
      if (!fields.price) {
        nextErrors.price = 'Price is required'
      } else if (!number_regex.test(fields.price)) {
        nextErrors.price = 'Price must be a number without decimal places'
      }
      if (!fields.discount) {
        nextErrors.discount = 'Discount is required'
      } else if (!number_regex.test(fields.discount)) {
        nextErrors.discount = 'Discount must be a number without decimal places'
      } else if (Number(fields.discount) >= Number(fields.price)) {
        nextErrors.discount = 'Discount must be less than the price'
      }
    },
  })

  return (
    <form
      className="grid gap-y-3"
      noValidate
      onSubmit={handleSubmit((f) => alert(JSON.stringify(f, null, 4)))}
    >
      <input
        className={tw_input}
        placeholder="Name"
        type="text"
        {...register('name')}
      />
      {errors.name && <small>⚠️ {errors.name}</small>}
      <input
        className={tw_input}
        placeholder="Price"
        type="number"
        {...register('price')}
      />
      {errors.price && <small>⚠️ {errors.price}</small>}
      <input
        className={tw_input}
        placeholder="Discount"
        type="number"
        {...register('discount')}
      />

      {errors.discount && <small>⚠️ {errors.discount}</small>}
      <button type="submit" className={tw_buton}>
        Submit
      </button>
      <button type="reset" className={tw_buton} onClick={reset}>
        Reset
      </button>
    </form>
  )
}

type Config<T extends string> = {
  fields: Record<T, string>
  validator: (
    fields: Config<T>['fields'],
    nextErrors: Config<T>['fields'],
  ) => void | Promise<void>
}

function useForm<T extends string>(config: Config<T>) {
  const { fields, validator } = config
  const [values, setValues] = useState(fields)
  const [errors, setErrors] = useState({} as typeof fields)

  function register(key: T) {
    return {
      value: values[key],
      name: key,
      autoComplete: 'on',
      'aria-invalid': Boolean(errors[key]),
      onChange,
    } satisfies React.ComponentProps<'input'>
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    const nextValues = { ...values, [name]: value }
    const nextErrors = {} as typeof errors
    validator(nextValues, nextErrors)
    setValues(nextValues)
    setErrors(nextErrors)
  }

  function handleSubmit(cb: (f: typeof fields) => void | Promise<void>) {
    return (async (e) => {
      e.preventDefault()
      const nextErrors = {} as typeof errors
      validator(values, nextErrors)
      setErrors(nextErrors)
      if (Object.values(nextErrors).some(Boolean)) return
      await cb(values)
    }) satisfies React.FormEventHandler<HTMLFormElement>
  }

  function reset() {
    setValues(fields)
    setErrors({} as typeof errors)
  }

  return {
    values,
    errors,
    register,
    handleSubmit,
    reset,
  }
}
