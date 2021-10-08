import { graphql } from 'gatsby'

export const query = graphql`
    fragment UserDataSettings on Query {
        prismicSiteSettings {
            data {
                trackers {
                    type
                    purpose
                    category
                    provider
                    tag_id
                    gdpr_link {
                        url
                        link_type
                        target
                    }
                }
                banner_background_color
                banner_button_type
                banner_explanation_text
                banner_text_type
            }
        }
    }
`
