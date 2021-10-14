import { Component } from 'react'
import { FormContext } from './FormContext'

export interface FormFieldProps {
  name?: string
}

export abstract class FormField<P extends FormFieldProps, S, V> extends Component<P, S> {
  static contextType = FormContext

  componentDidMount = () => {
    const { registerFormField } = this.context
    registerFormField(this)
  }

  abstract get value(): V

  abstract validate: () => boolean
}
