import React, { Component, createContext } from 'react'
import _ from 'lodash'
import { FormProps } from './Form'
import { FormField } from './FormField'

export type FormContextState = {
  getFormValues: () => Record<string, any>
  onSubmit: (e: React.FormEvent) => void
  registerFormField: (formField: FormField<any, any, any>) => void
  reset: () => void
}

const initialState: FormContextState = {
  getFormValues: () => ({}),
  onSubmit: () => void 0,
  registerFormField: (_formField: FormField<any, any, any>) => void 0,
  reset: () => void 0,
}

export const FormContext = createContext<FormContextState>(initialState)
const { Provider, Consumer } = FormContext
export const FormConsumer = Consumer

export default class FormProvider extends Component<FormProps, FormContextState> {
  formFields: Array<FormField<any, any, any>> = []

  constructor(props: FormProps) {
    super(props)

    this.state = {
      getFormValues: this.getFormValues,
      onSubmit: this.onSubmit,
      registerFormField: this.registerFormField,
      reset: this.reset,
    }
  }

  getFormValues = (): Record<string, any> => {
    const formValues: Record<string, any> = {}

    _.forEach(this.formFields, (formField) => {
      if (!formField.name) return
      formValues[formField.name] = formField.value
    })

    return formValues
  }

  reset = () => {
    _.forEach(this.formFields, (formField) => {
      formField.reset()
    })
  }

  onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const { onSubmit: providedSubmit } = this.props
    if (!this.validate()) {
      return
    }

    if (typeof providedSubmit === 'function') {
      providedSubmit(this.getFormValues(), { ...this.state })
    }
  }

  registerFormField = (formField: FormField<any, any, any>) => {
    this.formFields.push(formField)
  }

  validate = (): boolean => {
    let isValid = true
    _.forEach(this.formFields, (formField) => {
      isValid = formField.validate() && isValid
    })

    return isValid
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}
