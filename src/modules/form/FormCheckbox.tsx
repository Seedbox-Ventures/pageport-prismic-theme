import React, { ReactNode } from 'react'
import { FormContext } from './FormContext'
import { CheckboxProps, FormControl, FormControlLabel, FormHelperText } from '@mui/material'
import { FormField, FormFieldProps } from './FormField'
import Checkbox from '../basic/Checkbox'
import styled from 'styled-components'
import { ThemeColorType } from '../../theme'

export interface FormCheckboxProps extends CheckboxProps, FormFieldProps {
  label?: string
  value?: boolean
  helperText?: string
}

interface FormCheckboxState {
  value: boolean
  isValid: boolean
}

const initialState: FormCheckboxState = {
  value: false,
  isValid: true,
}

const StyledFormControl = styled(FormControl)(({ theme }) => {
  return {
    '&.Mui-error': {
      '&': {
        color: theme.getColorValueByType(ThemeColorType.Danger),
      },
      '& .MuiCheckbox-root svg': {
        fill: theme.getColorValueByType(ThemeColorType.Danger),
      },
    },
  }
})

export default class FormCheckbox extends FormField<FormCheckboxProps, FormCheckboxState, boolean> {
  static contextType = FormContext
  errorText: ReactNode

  constructor(props: FormCheckboxProps) {
    super(props)
    const { value = false, helperText } = props

    this.errorText = helperText
    this.state = { ...initialState, value }
  }

  get value(): boolean {
    return false
  }

  protected _isValidValue = (value: boolean): boolean => {
    const { required } = this.props

    return !required || value
  }

  onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget
    this.setState({ value: checked, isValid: this._isValidValue(checked) })
  }

  validate = (): boolean => {
    const { value } = this.state
    const isValid = this._isValidValue(value)

    this.setState({ isValid })

    return isValid
  }

  render = () => {
    const { label, helperText = '' } = this.props
    const { isValid } = this.state
    return (
      <StyledFormControl error={!isValid} className={isValid ? '' : 'Mui-error'}>
        <FormControlLabel control={<Checkbox {...this.props} onChange={this.onChange} />} label={label} />
        {!isValid && helperText.length !== 0 && <FormHelperText>{helperText}</FormHelperText>}
      </StyledFormControl>
    )
  }
}
