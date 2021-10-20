import React, { Component, createContext } from 'react'
import { EmailProviderInputData, EmailServiceProps, MessageProps } from './type'
import EmailService, { EmailServiceInitializationError } from './EmailService'
import { Contact } from '../../apiServices/email'

export interface EmailContextProviderState {
  defaultContact: Contact
  sendEmail: (messageProps: MessageProps) => Promise<Response>
}

const nullService: EmailService = new EmailService(undefined)

export const EmailContext = createContext<EmailService>(nullService)
const { Provider, Consumer } = EmailContext
export const EmailContextConsumer = Consumer

export default class EmailContextProvider extends Component<EmailServiceProps, EmailContextProviderState> {
  static mapDataToProps(emailServiceData: EmailProviderInputData): EmailServiceProps {
    const { email_host_name, email_provider, email_provider_api_key, email_sender_address, email_sender_name } =
      emailServiceData

    if (!email_provider_api_key || !email_sender_address || !email_provider || !email_host_name) {
      throw new EmailServiceInitializationError(
        `Received invalid data for mail context ${JSON.stringify(emailServiceData)}`,
      )
    }

    return {
      apiKey: email_provider_api_key,
      contact: { email: email_sender_address, name: email_sender_name },
      emailProviderType: email_provider,
      hostName: email_host_name,
    }
  }

  apiProvider: EmailService

  constructor(props: EmailServiceProps) {
    super(props)

    this.apiProvider = new EmailService(props)
  }

  render = () => {
    const { children } = this.props
    return <Provider value={this.apiProvider}>{children}</Provider>
  }
}
