import { EmailServiceProps } from './type'
import { Contact, EmailOptions, EmailProviderType } from '../../apiServices/email'
import { EmailApiBody } from '../../api/email'
import { ContactFormApiBody } from '../../api/contact-form'

export class EmailServiceError extends Error {}

export class EmailServiceInitializationError extends EmailServiceError {}

const endpoints = {
  contactForm: '/api/contact-form',
  email: '/api/email',
}

class EmailService {
  props: EmailServiceProps | undefined

  constructor(props: EmailServiceProps | undefined) {
    this.props = props
  }

  protected _getProp<R>(propName: string): R {
    // @ts-ignore
    if (!this.props || !this.props[propName]) {
      throw new EmailServiceInitializationError(
        `Email service is not initialized properly. No value for ${propName} provided.`,
      )
    }
    // @ts-ignore
    return this.props[propName] as R
  }

  get apiKey(): string {
    return this._getProp<string>('apiKey')
  }

  get defaultContact(): Contact {
    return this._getProp<Contact>('contact')
  }

  get emailProviderType(): EmailProviderType {
    return this._getProp<EmailProviderType>('emailProviderType')
  }

  get hostName(): string {
    return this._getProp<string>('hostName')
  }

  submitContactForm = async (contact: Contact, message: string, values?: Record<string, string>): Promise<boolean> => {
    const body: ContactFormApiBody = {
      apiKey: this.apiKey,
      emailProviderType: this.emailProviderType,
      hostName: this.hostName,
      message,
      from: contact,
      to: this.defaultContact,
      values,
    }
    const sendingOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
    try {
      return (await fetch(endpoints.contactForm, sendingOptions)).ok
    } catch (e) {
      //Do nothing
    }
    return false
  }

  sendEmail = async (emailOptions: EmailOptions): Promise<boolean> => {
    const body: EmailApiBody = {
      apiKey: this.apiKey,
      emailProviderType: this.emailProviderType,
      emailOptions,
    }
    const sendingOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
    return (await fetch(endpoints.email, sendingOptions)).ok
  }
}

export default EmailService
