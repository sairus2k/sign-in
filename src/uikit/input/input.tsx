import React, { VFC } from 'react'
import { useId } from '../../lib/use-id'

import classes from './input.module.css'

interface InputProps {
  label: string
  name: string
  placeholder?: string
  type?: 'text' | 'email' | 'password'
  required?: boolean
  autoComplete?: string
  defaultValue?: string
  error?: string
}

export const Input: VFC<InputProps> = ({
  label,
  name,
  placeholder,
  type = 'text',
  required = false,
  autoComplete,
  defaultValue,
  error,
}) => {
  const id = useId()
  const hasError = error !== undefined
  const alertId = `alert-${id}`
  return (
    <div className={classes.input}>
      <label htmlFor={id} className={classes.input_label}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        defaultValue={defaultValue}
        aria-required={required}
        aria-invalid={hasError}
        aria-describedby={hasError ? alertId : undefined}
        className={classes.input_input}
      />
      {hasError && (
        <div
          role="alert"
          aria-atomic
          id={alertId}
          className={classes.input_error}
        >
          {error}
        </div>
      )}
    </div>
  )
}
