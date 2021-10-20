import _ from 'lodash'
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import { Contact, EmailOptions, EmailProviderType, ProviderMap } from '../apiServices/email'

export interface ContactFormApiBody {
  apiKey: string
  emailProviderType: EmailProviderType
  hostName: string
  message: string
  from: Contact
  to: Contact
  values?: Record<string, string>
}

export default function handler(req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) {
  try {
    if (req.method === 'POST') {
      const { apiKey, emailProviderType }: ContactFormApiBody = req.body
      const emailProvider = ProviderMap[emailProviderType]
      const emailOptions = getEmailOptionsFromRequestBody(req.body)
      emailProvider
        .sendEmail(emailOptions, apiKey)
        .then(() => {
          res.status(200).send('Success')
        })
        .catch((e) => {
          res.status(500).send(e)
        })
    } else {
      res.status(400).send('Invalid Request')
    }
  } catch (e) {
    res.status(500).send(e)
  }
}

function getEmailOptionsFromRequestBody({
  from,
  to,
  hostName,
  message,
  values = {},
}: ContactFormApiBody): EmailOptions {
  const sender = { email: `noreply@${hostName}`, name: 'Contact Form' }
  const subject = `Message from ${from.name}<${from.email}>`
  const valueString = _.map(values, (value, key) => `${key}: ${value}`).join('\r\n')
  const textContent = `
    A contact form on ${hostName} received a message from ${from.name}<${from.email}>
    
    ${message}
    - - - - - - - - - - - - - - - - - - - -
    ${valueString}
  `
  return {
    from: sender,
    to: [to],
    replyTo: from,
    subject,
    textContent,
  }
}
