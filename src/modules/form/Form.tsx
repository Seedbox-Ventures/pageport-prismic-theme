import React from 'react'
import FormProvider, { FormConsumer } from './FormContext'

export interface FormField {
  validate: () => boolean
}

export interface FormProps {
  className?: string
  onSubmit?: () => void
}

const Form: React.FC<FormProps> = (props) => {
  const { children, className } = props

  return (
    <FormProvider {...props}>
      <FormConsumer>
        {() => {
          return <form className={className}>{children}</form>
        }}
      </FormConsumer>
    </FormProvider>
  )
}

export default Form
