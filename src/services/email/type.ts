export enum EmailAPIProviderType {
  undefined = 'undefined',
  Sendinblue = 'Sendinblue',
}

export interface Contact {
  email: string
  name?: string
}

export interface EmailProviderInputData {
  email_api?: EmailAPIProviderType
  email_api_key?: string
  email_sender_address?: string
  email_sender_name?: string
}

export interface EmailProviderProps {
  apiKey?: string
  apiProvider?: EmailAPIProviderType
  contact?: Contact
}

export interface MessageProps {
  sender: Contact
  to: Contact
  subject: string
  textContent: string
  htmlContent?: string
}
