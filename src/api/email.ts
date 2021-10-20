import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import { EmailOptions, EmailProviderType, ProviderMap } from '../apiServices/email'

export interface EmailApiBody {
  apiKey: string
  emailProviderType: EmailProviderType
  emailOptions: EmailOptions
}

export default function handler(req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) {
  try {
    if (req.method === 'POST') {
      const { emailProviderType, emailOptions }: EmailApiBody = req.body
      const EmailProvider = ProviderMap[emailProviderType]
      EmailProvider
        .sendEmail(emailOptions)
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
