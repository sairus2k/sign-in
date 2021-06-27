import React, { ReactNode } from 'react'
import classes from './button.module.css'

interface ButtonProps {
  children: ReactNode
  disabled?: boolean
  isLoading?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export const Button: React.VFC<ButtonProps> = ({
  disabled,
  isLoading = false,
  type = 'button',
  children,
}) => {
  return (
    <button
      type={type}
      disabled={isLoading || disabled}
      className={classes.button}
    >
      {isLoading ? 'Loading ...' : children}
    </button>
  )
}
