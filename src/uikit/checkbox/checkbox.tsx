import React, { VFC } from 'react'
import { useId } from '../../lib/use-id'
import classes from './checkbox.module.css'

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
    <div className={classes.checkbox}>
      <input
        id={id}
        name={name}
        type="checkbox"
        required={required}
        defaultChecked={defaultValue}
        aria-required={required}
        aria-invalid={hasError}
        aria-describedby={hasError ? alertId : undefined}
        className={classes.checkbox_input}
      />
      <label htmlFor={id} className={classes.checkbox_label}>
        {label}
      </label>
      {hasError && (
        <div role="alert" aria-atomic id={alertId} className={classes.checkbox_error}>
          {error}
        </div>
      )}
    </div>
  )
}
