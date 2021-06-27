import React, { FormEvent, useRef, useState } from 'react'
import { Input } from '../uikit/input/input'
import { Checkbox } from '../uikit/checkbox/checkbox'
import { getValues, validate, Validation } from '../lib/form'
import classes from './sign-in.module.css'
import { Button } from '../uikit/button/button'

interface SignInProps {
  isSubmitting: boolean
  onSubmit: (values: LoginFormState) => void
}

type InputName = keyof LoginFormState
type LoginFormErrors = Record<InputName, string>
export type LoginFormState = typeof defaultValues

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
  rememberMe: {},
}

const defaultValues = Object.freeze({
  email: '',
  password: '',
  rememberMe: false,
})

export const SignIn: React.VFC<SignInProps> = ({ isSubmitting, onSubmit }) => {
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
      onSubmit(values)
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      noValidate
      className={classes.signIn}
    >
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
        label="Remember me"
        defaultValue={defaultValues.rememberMe}
        error={errors.rememberMe}
      />
      <Button type="submit" isLoading={isSubmitting}>
        Sign In
      </Button>
    </form>
  )
}
