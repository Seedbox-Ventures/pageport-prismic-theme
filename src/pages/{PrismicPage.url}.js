// {PrismicPage.url}.js file
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

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

console.log('BUILD PAGE - NODE ENV', process.env.NODE_ENV);
console.log('BUILD PAGE - REPO NAME', process.env.PRISMIC_REPO_NAME);
console.log('BUILD PAGE - API KEY', process.env.PRISMIC_API_KEY);

export default withPrismicPreview(PageTemplate, [
  {
    repositoryName: process.env.PRISMIC_REPO_NAME,
    accessToken: process.env.PRISMIC_API_KEY,
    linkResolver,
  },
])
