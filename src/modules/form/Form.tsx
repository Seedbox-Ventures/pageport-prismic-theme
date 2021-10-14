import React from 'react'
import FormProvider from './FormContext'

export interface FormProps {
  className?: string
}

const Form: React.FC<FormProps> = ({ children, className }) => {
  return (
    <FormProvider>
      <form className={className}>{children}</form>
    </FormProvider>
  )
}

export default Form
