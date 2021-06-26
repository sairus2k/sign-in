import React, { VFC } from 'react'
import { useId } from '../lib/use-id'

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
    <div>
      <label htmlFor={id}>{label}</label>
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
      />
      {hasError && (
        <div role="alert" aria-atomic id={alertId}>
          {error}
        </div>
      )}
    </div>
  )
}
