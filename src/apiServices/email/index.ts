import { EmailService, EmailProviderType } from './type'
import Sendinblue from './Sendinblue'

export const ProviderMap: Record<EmailProviderType, EmailService> = {
  [EmailProviderType.Sendinblue]: Sendinblue,
}

export * as Sendingblue from './Sendinblue'
export * from './type'
