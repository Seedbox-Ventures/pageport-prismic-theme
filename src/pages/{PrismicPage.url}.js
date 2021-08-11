// {PrismicPage.url}.js file

import * as React from 'react'
import { graphql } from 'gatsby'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { linkResolver } from '../utils/LinkResolver'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { SliceZone } from '../components/SliceZone'

const PageTemplate = ({ data }) => {
  if (!data) return null
  const page = data.prismicPage

  return (
    <Layout>
      <Seo title={page.data.document_display_name.text} />
      <SliceZone sliceZone={page.data.body} />
    </Layout>
  )
}

export const query = graphql`
    query PageQuery($id: String) {
        prismicPage(id: { eq: $id }) {
            _previewable
            data {
                document_display_name {
                    text
                }
                body {
                    ... on PrismicSliceType {
                        slice_type
                    }
                    ...PageDataBodyText
                    ...PageDataBodyQuote
                    ...PageDataBodyFullWidthImage
                    ...PageDataBodyImageGallery
                    ...PageDataBodyImageHighlight
                }
            }
        }
    }
`

export default withPrismicPreview(PageTemplate, [
  {
    repositoryName: 'pageport-playground',
    accessToken: 'MC5ZUlBXVWhJQUFDNEFDdm5K.bCZ-77-977-9G3fvv70dEO-_vVHvv73vv73vv71bHmZp77-977-977-9Be-_ve-_vUXvv70A77-977-9Y2E',
    linkResolver,
  },
])
