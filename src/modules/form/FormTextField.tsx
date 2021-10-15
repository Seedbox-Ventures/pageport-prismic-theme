import React, { ReactNode } from 'react'
import { TextFieldProps } from '@mui/material'
import TextField from '../basic/TextField'
import { FormConsumer } from './FormContext'
import { isNumber } from 'lodash'
import { isEMail, isPhoneNumber } from '../../utils/Validation'
import { FormField, FormFieldProps } from './FormField'

interface FormTextFieldState {
  isTouched: boolean
  isValid: boolean
  value: string
}

export type FormTextFieldProps = TextFieldProps & FormFieldProps

const initialState: FormTextFieldState = {
  isTouched: false,
  isValid: true,
  value: '',
}

export default class FormTextField extends FormField<FormTextFieldProps, FormTextFieldState, string> {
  errorText: ReactNode

  constructor(props: FormTextFieldProps) {
    super(props)

    this.errorText = props.helperText
    this.state = { ...initialState }
  }

  get value(): string {
    return this.state.value
  }

  onBlur = () => {
    const { value } = this.state
    this.setState({ isTouched: true, isValid: this._isValidValue(value) })
  }

  onChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.currentTarget
    const { isTouched } = this.state
    this.setState({ value, isValid: !isTouched || this._isValidValue(value) })
  }

  protected _isValidValue = (value: string): boolean => {
    const { required, type = 'text' } = this.props

    if (required && value.length === 0) {
      return false
    }

    switch (type) {
      case 'number':
        return isNumber(value)
      case 'email':
        return isEMail(value)
      case 'tel':
        return isPhoneNumber(value)
    }

    return true
  }

  validate = (): boolean => {
    const { value, isTouched } = this.state
    const isValid = this._isValidValue(value)

    this.setState({ isValid, isTouched: isTouched || !isValid })

    return isValid
  }

  render = () => {
    const { isValid, value } = this.state
    return (
      <FormConsumer>
        {() => {
          return (
            <TextField
              {...this.props}
              value={value}
              helperText={isValid ? '' : this.errorText}
              onBlur={this.onBlur}
              onChange={this.onChange}
              error={!isValid}
              type={'text'}
            />
          )
        }}
      </FormConsumer>
    )
  }
}
