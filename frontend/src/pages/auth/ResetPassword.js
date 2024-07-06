import React from 'react'
import { Link as RouterLink } from "react-router-dom"
import { Link, Stack, Typography } from '@mui/material'
import { CaretLeft } from 'phosphor-react'
import ResetPasswordForm from '../../sections/auth/ResetPasswordForm'


const ResetPassword = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h3" paragraph>
          have you forgotten your Password?
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 5 }}>
          Please enter the email address associated with your current account and we will email you a link to reset your password.
        </Typography>

        {/* reset Password Form */}
        <ResetPasswordForm />

        {/* this link is a component of metarial ui but ace as the link from the react router dom because we are passing the react router dom Link as prop */}
        <Link component={RouterLink} to="/auth/login" color="inherit" variant="subtitle2" sx={{ mt: 3, mx: "auto", alignItems: "center", display: "inline-flex" }}>
          <CaretLeft />
          Return to Sign in
        </Link>

      </Stack>
    </>
  )
}

export default ResetPassword