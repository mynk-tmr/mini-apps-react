import { useState } from 'react'

export default {
  title: 'Forms',
  href: '/forms',
  component: App,
}

function App() {
  const tw_input =
    'p-4 border rounded-sm font-mono min-w-xs placeholder:capitalize'

  const email_regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  const name_regex = /^[A-Za-z]{3,20}$/
  const pass_regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,24}$/

  const { register, errors, handleSubmit } = useForm({
    fields: {
      username: '',
      email: '',
      password: '',
    },
    validator: (key, fields) => {
      if (key === 'username' && !name_regex.test(fields.username))
        return 'Must be 3-20 characters & only letters'
      if (key === 'email' && !email_regex.test(fields.email))
        return 'Invalid Email'
      if (key === 'password' && !pass_regex.test(fields.password))
        return 'Must be 8-24 characters & contain 1 uppercase, 1 lowercase, 1 number & 1 special character'
    },
  })

  const [showPass, setshowPass] = useState(false)

  return (
    <form
      className="grid gap-y-3"
      noValidate
      onSubmit={handleSubmit((f) => alert(JSON.stringify(f, null, 4)))}
    >
      <input
        className={tw_input}
        placeholder="name"
        type="text"
        {...register('username')}
      />
      {errors.username && <small>⚠️ {errors.username}</small>}
      <input
        className={tw_input}
        placeholder="email"
        type="email"
        {...register('email')}
      />
      {errors.email && <small>⚠️ {errors.email}</small>}
      <input
        className={tw_input}
        placeholder="password"
        type={showPass ? 'text' : 'password'}
        {...register('password')}
      />
      {errors.password && <small className="w-xs">⚠️ {errors.password}</small>}
      <button type="submit" className="py-2 bg-violet-600 hover:bg-sky-500">
        Submit
      </button>
      <label>
        <input
          className="accent-violet-500"
          type="checkbox"
          onChange={() => setshowPass(!showPass)}
          checked={showPass}
        />{' '}
        Show Password
      </label>
    </form>
  )
}

type Config<T extends string> = {
  fields: Record<T, string>
  validator: (key: T, fields: Config<T>['fields']) => string | undefined
}

function useForm<T extends string>(config: Config<T>) {
  const { fields, validator } = config
  const [values, setValues] = useState(fields)
  const [errors, setErrors] = useState(fields)

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
    setValues({ ...values, [name]: value })
    const error = validator(name as T, { ...values, [name]: value })
    setErrors({ ...errors, [name]: error || '' })
  }

  function handleSubmit(cb: (f: typeof fields) => void | Promise<void>) {
    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault()
      const nextErrors = {} as typeof errors
      for (const key in errors) {
        nextErrors[key] = validator(key, values) || ''
      }
      setErrors(nextErrors)
      if (Object.values(nextErrors).some(Boolean)) return
      await cb(values)
    }
    return onSubmit
  }

  return {
    values,
    errors,
    register,
    handleSubmit,
  }
}
