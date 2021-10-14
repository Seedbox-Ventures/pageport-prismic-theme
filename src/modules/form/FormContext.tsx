import React, { Component, createContext } from 'react'
import _ from 'lodash'
import { FormProps } from './Form'
import { FormField } from './FormField'

export type FormContextState = {
  onSubmit: () => void
  registerFormField: (formField: FormField<any, any, any>) => void
}

const initialState: FormContextState = {
  onSubmit: () => void 0,
  registerFormField: (_formField: FormField<any, any, any>) => void 0,
}

export const FormContext = createContext<FormContextState>(initialState)
const { Provider, Consumer } = FormContext
export const FormConsumer = Consumer

export default class FormProvider extends Component<FormProps, FormContextState> {
  formFields: Array<FormField<any, any, any>> = []

  constructor(props: FormProps) {
    super(props)

    this.state = {
      onSubmit: this.onSubmit,
      registerFormField: this.registerFormField,
    }
  }

  onSubmit = () => {
    const { onSubmit: providedSubmit } = this.props
    if (!this.validate()) {
      return
    }

    if (typeof providedSubmit === 'function') {
      providedSubmit()
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
