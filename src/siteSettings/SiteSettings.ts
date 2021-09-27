import { graphql } from 'gatsby'



export const query = graphql`
    fragment SiteSettings on Query {
        prismicSiteSettings {
            _previewable
            data {
                site_name
                trackers {
                    tracking_type
                    tracking_tag_id
                    tracking_provider
                    tracker_purpose
                    tracking_category
                    tracking_code {
                        text
                    }
                    tracking_gdpr_link {
                        url
                        target
                        link_type
                    }
                }
            }
        }
    }
`
