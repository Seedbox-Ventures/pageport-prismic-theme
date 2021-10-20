import React, { ReactNode } from 'react'
import { FormContext } from './FormContext'
import { CheckboxProps, FormControl, FormControlLabel, FormHelperText } from '@mui/material'
import { FormField, FormFieldProps } from './FormField'
import Checkbox from '../basic/Checkbox'
import styled from 'styled-components'
import { ThemeColorType } from '../../theme'

export interface FormCheckboxProps extends CheckboxProps, FormFieldProps {
  label?: ReactNode
  checked?: boolean
  helperText?: string
  value?: string
}

interface FormCheckboxState {
  checked: boolean
  isValid: boolean
  value?: string
}

const initialState: FormCheckboxState = {
  checked: false,
  isValid: true,
}

const StyledFormControl = styled(FormControl)(({ theme }) => {
  return {
    '&.MuiFormControl-root': {
      '&': {
        '& .MuiFormControlLabel-root': {
          '&': { alignItems: 'start' },
          '& .MuiTypography-root': {
            paddingTop: '9px',
          },
        },
      },
      '&.Mui-error': {
        '&': {
          color: theme.getColorValueByType(ThemeColorType.Danger),
        },
        '& .MuiCheckbox-root svg': {
          fill: theme.getColorValueByType(ThemeColorType.Danger),
        },
      },
    },
  }
})

export default class FormCheckbox extends FormField<FormCheckboxProps, FormCheckboxState, string> {
  static contextType = FormContext
  errorText: ReactNode

  constructor(props: FormCheckboxProps) {
    super(props)
    const { checked = false, helperText, value } = props

    this.errorText = helperText
    this.state = { ...initialState, checked, value }
  }

  get value(): string | undefined {
    const { checked, value } = this.state

    return checked ? value ?? 'on' : undefined
  }

  protected _isValidState = (value: boolean): boolean => {
    const { required } = this.props

    return !required || value
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props
    const { checked } = e.currentTarget
    this.setState({ checked, isValid: this._isValidState(checked) })
    if (typeof onChange === 'function') {
      onChange(e, checked)
    }
  }

  validate = (): boolean => {
    const { checked } = this.state
    const isValid = this._isValidState(checked)

    this.setState({ isValid })

    return isValid
  }

  reset = () => {
    this.setState({ ...initialState })
  }

  render = () => {
    const { label, helperText = '' } = this.props
    const { isValid, checked } = this.state

    return (
      <StyledFormControl error={!isValid} className={isValid ? '' : 'Mui-error'}>
        <FormControlLabel
          control={<Checkbox {...this.props} onChange={this.onChange} checked={checked} />}
          label={label}
        />
        {!isValid && helperText.length !== 0 && <FormHelperText>{helperText}</FormHelperText>}
      </StyledFormControl>
    )
  }
}
