import { RequestInit } from 'node-fetch'
import { EmailOptions, EmailService } from './type'

class Sendinblue extends EmailService {
  emailEndpoint = 'https://api.sendinblue.com/v3/smtp/email'

  mapEmailOptionsToRequestObject(
    { from, to, cc, bcc, replyTo, subject, textContent, htmlContent }: EmailOptions,
    apiKey?: string,
  ): RequestInit {
    if (!apiKey) {
      throw 'No API key provided for Sendinblue API request.'
    }
    return {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey!,
      },
      body: JSON.stringify({
        sender: from,
        to: to,
        cc,
        bcc,
        replyTo,
        subject,
        textContent,
        htmlContent,
      }),
    }
  }
}

export default new Sendinblue()
