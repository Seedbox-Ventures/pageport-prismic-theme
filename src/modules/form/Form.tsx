import React from 'react'
import FormProvider, { FormConsumer, FormContextState } from './FormContext'

export interface FormProps {
  className?: string
  onSubmit?: (formValues: Record<string, any>, context: FormContextState) => void
}

const Form: React.FC<FormProps> = (props) => {
  const { children, className } = props

  return (
    <FormProvider {...props}>
      <FormConsumer>
        {(  ) => {
          return <form className={className}>{children}</form>
        }}
      </FormConsumer>
    </FormProvider>
  )
}

export default Form
