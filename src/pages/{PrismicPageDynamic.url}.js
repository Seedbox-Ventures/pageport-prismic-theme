import * as React from 'react'
import { graphql } from 'gatsby'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { previewConfig } from '../utils/Prismic'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { SliceZone } from '../components/SliceZone'

const DynamicPageTemplate = ({ data }) => {
  if (!data) return null
  const page = data.prismicPageDynamic

  return (
    <Layout>
      <Seo title={page.data.page_title} />
      <SliceZone sliceZone={page.data.body} />
    </Layout>
  )
}

export const query = graphql`
    query DynamicPageQuery($id: String) {
        site {
            siteMetadata {
                title
            }
        }
        prismicPageDynamic(id: { eq: $id }) {
            _previewable
            data {
                body {
                    ... on PrismicSliceType {
                        slice_type
                    }
                    ...PageDynamicDataBodyText
                }
            }
        }
    }

`

export default withPrismicPreview(DynamicPageTemplate, [
  previewConfig,
])
