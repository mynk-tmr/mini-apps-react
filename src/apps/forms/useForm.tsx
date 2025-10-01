import { useState } from 'react'

export type Config<T extends string> = {
  fields: Record<T, string>
  validator: (
    fields: Config<T>['fields'],
    nextErrors: Config<T>['fields'],
  ) => void | Promise<void>
}

export function useForm<T extends string>(config: Config<T>) {
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
