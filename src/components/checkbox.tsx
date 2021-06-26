import React, { VFC } from 'react'
import { useId } from '../lib/use-id'

interface CheckboxProps {
  label: string
  name: string
  required?: boolean
  defaultValue?: boolean
  error?: string
}

export const Checkbox: VFC<CheckboxProps> = ({
  label,
  name,
  required,
  defaultValue,
  error,
}) => {
  const id = useId()
  const hasError = error !== undefined
  const alertId = `alert-${id}`
  return (
    <div>
      <input
        name={name}
        type="checkbox"
        required={required}
        defaultChecked={defaultValue}
        aria-required={required}
        aria-invalid={hasError}
        aria-describedby={hasError ? alertId : undefined}
      />
      <label htmlFor={id}>{label}</label>
      {hasError && (
        <div role="alert" aria-atomic id={alertId}>
          {error}
        </div>
      )}
    </div>
  )
}
