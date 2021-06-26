import React, { FormEvent, ReactElement, useRef, useState } from 'react'
import './app.css'
import { Input } from './components/input'
import { getValues, validate, Validation } from './lib/form'
import { Checkbox } from './components/checkbox'

type InputName = keyof LoginFormState
type LoginFormErrors = Record<InputName, string>
type LoginFormState = typeof defaultValues

const validation: Validation<LoginFormState> = {
  email: {
    required: 'Please enter your email',
    pattern: {
      value: /^\S+@\S+$/,
      message: 'Please enter valid email address',
    },
  },
  password: {
    required: 'Please enter your password',
    minLength: {
      value: 6,
      message: 'Password should contain at least 6 symbols',
    },
  },
  rememberMe: {
    validate: (value: unknown) =>
      value === true ? undefined : 'Please confirm',
  },
}

const defaultValues = Object.freeze({
  email: '',
  password: '',
  rememberMe: false,
})

export const App = (): ReactElement => {
  const formRef = useRef<HTMLFormElement>(null)

  const [errors, setErrors] = useState<Partial<LoginFormErrors>>({})

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    const { current: formElement } = formRef

    if (!formElement) {
      return
    }

    const validationErrors = validate(formElement, validation, defaultValues)

    if (validationErrors !== undefined) {
      setErrors(validationErrors)
    } else {
      const values = getValues(formElement, defaultValues)
      setErrors({})
      alert(`Signing in with email "${values.email}"`)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} ref={formRef} noValidate>
        <Input
          type="email"
          name="email"
          label="Your email"
          placeholder="Enter your email"
          required
          autoComplete="username"
          defaultValue={defaultValues.email}
          error={errors.email}
        />
        <Input
          type="password"
          name="password"
          label="Your password"
          placeholder="Enter your password"
          required
          autoComplete="current-password"
          defaultValue={defaultValues.password}
          error={errors.password}
        />
        <Checkbox
          name="rememberMe"
          label="Agree"
          defaultValue={defaultValues.rememberMe}
          error={errors.rememberMe}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}
