/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, VFC } from 'react'
import classes from './app.module.css'
import { LoginFormState, SignIn } from './sign-in/sign-in'
import { Lock } from './uikit/icons'

export const App: VFC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSubmit = (values: LoginFormState) => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      alert(`Signing in with email "${values.email}"`)
    }, 2000)
  }

  return (
    <div className={classes.app}>
      <div className={classes.card}>
        <header className={classes.card_header}>
          <div className={classes.card_title}>Welcome Back!</div>
          <div className={classes.card_subTitle}>Sign in to continue</div>
        </header>
        <div className={classes.card_body}>
          <SignIn isSubmitting={isSubmitting} onSubmit={handleSubmit} />
        </div>
        <div className={classes.card_footer}>
          <a href="#" className={classes.card_footerLink}>
            <Lock />
            Forgot your password?
          </a>
        </div>
      </div>
      <div className={classes.footer}>
        <div>
          Don’t have an account ? <a href="#">Signup now</a>
        </div>
        <div>© 2020 Crafted and designed by 10ursabanoglu. 🎉</div>
      </div>
    </div>
  )
}
