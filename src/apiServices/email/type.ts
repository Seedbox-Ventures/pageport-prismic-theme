import fetch, { RequestInit } from 'node-fetch'

export interface Contact {
  email: string
  name?: string
}

export interface EmailOptions {
  from: Contact
  to: Array<Contact>
  cc?: Array<Contact>
  bcc?: Array<Contact>
  replyTo?: Contact
  subject: string
  textContent: string
  htmlContent?: string
}

export abstract class EmailService {
  abstract emailEndpoint: string

  abstract mapEmailOptionsToRequestObject(emailOptions: EmailOptions, apiKey?: string): RequestInit

  async sendEmail(emailOptions: EmailOptions, apiKey?: string): Promise<void> {
    const sendingOptions = this.mapEmailOptionsToRequestObject(emailOptions, apiKey)
    await fetch(this.emailEndpoint, sendingOptions)
    return
  }
}

export enum EmailProviderType {
  Sendinblue = 'Sendinblue',
}
