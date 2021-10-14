import React from 'react'
import Button, { ButtonProps } from '../basic/Button'
import { FormConsumer } from './FormContext'

const FormSubmit: React.FC<ButtonProps> = (props) => {
  return (
    <FormConsumer>
      {({onSubmit}) => {
        return <Button {...props} type={'submit'} onClick={onSubmit}/>
      }}
    </FormConsumer>
  )
}

export default FormSubmit
