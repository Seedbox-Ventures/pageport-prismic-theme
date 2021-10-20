import { Contact, EmailProviderType } from '../../apiServices/email'

export interface EmailProviderInputData {
  email_host_name?: string
  email_provider?: EmailProviderType
  email_provider_api_key?: string
  email_sender_address?: string
  email_sender_name?: string
}

export interface EmailServiceProps {
  apiKey: string
  contact: Contact
  emailProviderType: EmailProviderType
  hostName: string
}

export interface MessageProps {
  sender: Contact
  receiver: Contact
  subject: string
  textContent: string
  htmlContent?: string
}
