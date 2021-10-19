import EmailAPIProvider, { EmailAPIInitializationError } from './EmailAPIProvider'
import { Contact, EmailAPIProviderType, EmailProviderProps, MessageProps } from './type'

const sendingEndpoint = 'https://api.sendinblue.com/v3/smtp/email'

class Sendinblue implements EmailAPIProvider {
  type = EmailAPIProviderType.Sendinblue
  apiKey?: string
  defaultContact?: Contact

  constructor({ apiKey = '', contact }: EmailProviderProps) {
    this.apiKey = apiKey
    this.defaultContact = contact
  }

  signUp = (_contact: Contact): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      resolve(true)
    })
  }

  handleUserMessage = (contact: Contact, message: string) => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        if (!this.defaultContact) {
          reject(new EmailAPIInitializationError('E-Mail contact is not defined'))
        }
        const response = await this.sendEmail({
          sender: contact,
          to: this.defaultContact!,
          textContent: message,
          subject: 'Message from contact form',
        })
        if (response.status < 300 && response.status >= 200) {
          return resolve(true)
        }
        return reject(response.body)
      } catch (e) {
        reject(e)
      }
    })
  }

  sendEmail = ({ sender, to, htmlContent, textContent, subject }: MessageProps) => {
    if (!this.apiKey) {
      throw new EmailAPIInitializationError(
        `The email api of ${this.type} requires an api key. The api key is not defined`,
      )
    }
    const sendingOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': this.apiKey,
      },
      body: JSON.stringify({
        sender,
        to,
        htmlContent,
        textContent,
        subject,
      }),
    }
    return fetch(sendingEndpoint, sendingOptions)
  }
}

export default Sendinblue
