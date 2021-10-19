import { Contact, EmailAPIProviderType } from './type'

abstract class EmailAPIProvider {
  abstract type: EmailAPIProviderType
  abstract apiKey?: string
  abstract defaultContact?: Contact

  abstract signUp: (contact: Contact) => Promise<boolean>
  abstract handleUserMessage: (contact: Contact, message: string) => Promise<boolean>
}

export class EmailAPIError extends Error {}

export class EmailAPIInitializationError extends EmailAPIError {}

export default EmailAPIProvider
