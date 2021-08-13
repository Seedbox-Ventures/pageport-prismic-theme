// index.js file

import * as React from 'react'
import { graphql } from 'gatsby'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { SliceZone } from '../components/SliceZone'
import { previewConfig } from '../utils/Prismic'

const HomeTemplate = ({ data }) => {
  if (!data) return null
  const doc = data.prismicHomepage.data

  return (
    <Layout isHomepage={true}>
      <Seo title='Home' />
      <SliceZone sliceZone={doc.body} />
    </Layout>
  )
}

export const query = graphql`
    query MyQuery {
        prismicHomepage {
            _previewable
            data {
                banner_title {
                    raw
                }
                banner_description {
                    raw
                }
                banner_link {
                    url
                    type
                    uid
                }
                banner_link_label {
                    raw
                }
                banner_background {
                    url
                }
                body {
                    ... on PrismicSliceType {
                        slice_type
                    }
                    ...HomepageDataBodyText
                    ...HomepageDataBodyQuote
                    ...HomepageDataBodyFullWidthImage
                    ...HomepageDataBodyImageGallery
                    ...HomepageDataBodyImageHighlight
                }
            }
        }
    }
`

export default withPrismicPreview(HomeTemplate, [
  previewConfig,
])
