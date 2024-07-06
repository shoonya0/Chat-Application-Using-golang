import React from 'react'
import { Link, Stack, Typography } from '@mui/material'
import { CaretLeft } from 'phosphor-react'
import { Link as RouterLink } from "react-router-dom"
import NewPasswordForm from '../../sections/auth/NewPasswordForm'

const NewPassword = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h3" paragraph>
          Reset your password
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 5 }}>
          Please set a new password for your account.
        </Typography>
      </Stack>

      {/* NewPasswordForm */}
      <NewPasswordForm />

      {/* this link is a component of metarial ui but ace as the link from the react router dom because we are passing the react router dom Link as prop */}
      <Link component={RouterLink} to="/auth/login" color="inherit" variant="subtitle2" sx={{ mt: 3, mx: "auto", alignItems: "center", display: "inline-flex" }}>
        <CaretLeft />
        Return to Sign in
      </Link>
    </>
  )
}

export default NewPassword