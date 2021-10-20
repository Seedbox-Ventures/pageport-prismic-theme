import { graphql } from 'gatsby'

export const query = graphql`
    fragment EmailSettings on Query {
        prismicSiteSettings {
            data {
                email_host_name
                email_provider
                email_provider_api_key
                email_sender_address
                email_sender_name
            }
        }
    }
`
