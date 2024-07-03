// this js component is used to provide is act like a wrapper for the form components
import React from 'react'
import { FormProvider as Form } from 'react-hook-form'
const FormProvider = ({ children, onSubmit, methods }) => {
    return (
        <Form {...methods}>
            <form onSubmit={onSubmit}>{children}</form>
        </Form>
    )
}

export default FormProvider