import React, { ChangeEventHandler, Component, createContext } from 'react'
import { FormProps } from './Form'

export type FormContext = {
  onChange: ChangeEventHandler<HTMLInputElement>
  iAmHere: (args: any) => void
}

const initialState: FormContext = {
  onChange: () => void 0,
  iAmHere: () => void 0,
}

const { Provider, Consumer } = createContext<FormContext>(initialState)
export const FormConsumer = Consumer

export default class FormProvider extends Component<FormProps, FormContext> {
  state = { ...initialState }

  constructor(props: FormProps) {
    super(props)

    this.state = {
      onChange: this.onChange,
      iAmHere: this.iAmHere,
    }
  }

  iAmHere(...args: any[]) {
    console.log('I AM HERE', args)
  }

  onChange(...args: any) {
    console.log('ON CHANGE', args)
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}
