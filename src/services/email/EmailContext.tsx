import React, { Component, createContext } from 'react'
import { Contact, EmailAPIProviderType, EmailProviderInputData, EmailProviderProps, MessageProps } from './type'
import EmailAPIProvider, { EmailAPIInitializationError } from './EmailAPIProvider'
import Sendinblue from './Sendinblue'

export interface EmailProviderState {
  defaultContact: Contact
  sendEmail: (messageProps: MessageProps) => Promise<Response>
}

const nullProvider: EmailAPIProvider = {
  type: EmailAPIProviderType.undefined,
  signUp: () =>
    new Promise<boolean>((_resolve, reject) => {
      reject(new EmailAPIInitializationError('Email provider function "signUp" not initialized'))
    }),
  handleUserMessage: () =>
    new Promise<boolean>((_resolve, reject) => {
      reject(new EmailAPIInitializationError('Email provider function "handleUserMessage" not initialized'))
    }),
}

export const EmailContext = createContext<EmailAPIProvider>(nullProvider)
const { Provider, Consumer } = EmailContext
export const EmailContextConsumer = Consumer

export default class EmailProvider extends Component<EmailProviderProps, EmailProviderState> {
  static mapDataToProps({ email_api, email_api_key }: EmailProviderInputData): EmailProviderProps {
    return { apiKey: email_api_key, apiProvider: email_api }
  }

  static initProvider(props: EmailProviderProps): EmailAPIProvider {
    const { apiProvider } = props
    switch (apiProvider) {
      case EmailAPIProviderType.Sendinblue:
        return new Sendinblue(props)
    }
    throw new EmailAPIInitializationError(`No implementation found for provider type ${apiProvider}`)
  }

  apiProvider: EmailAPIProvider

  constructor(props: EmailProviderProps) {
    super(props)

    this.apiProvider = EmailProvider.initProvider(props)
  }

  render = () => {
    const { children } = this.props
    return <Provider value={this.apiProvider}>{children}</Provider>
  }
}
