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

  get name(): string | undefined {
    const { name } = this.props
    return name
  }

  abstract get value(): V | undefined

  abstract validate: () => boolean

  abstract reset: () => void
}
