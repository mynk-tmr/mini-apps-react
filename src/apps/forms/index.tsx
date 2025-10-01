import { useForm } from './useForm'

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
        nextErrors.price = 'Price must be positive integer'
      }
      if (!fields.discount) {
        nextErrors.discount = 'Discount is required'
      } else if (!number_regex.test(fields.discount)) {
        nextErrors.discount = 'Discount must be positive integer'
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
