import { graphql } from 'gatsby'

export const query = graphql`
    fragment EmailSettings on Query {
        prismicSiteSettings {
            data {
                email_api
                email_api_key
                email_sender_address
                email_sender_name
            }
        }
    }
`
