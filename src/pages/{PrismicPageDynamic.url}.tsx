import * as React from 'react'
import * as gatsby from 'gatsby'
import { graphql } from 'gatsby'
import { UnknownRecord, withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { previewConfig } from '../utils/Prismic'
import { Layout } from '../components/Layout'
import { SEO } from '../components/Seo'
import { SliceZone } from '../components/SliceZone'
import { SliceData } from '../slices'
import { WithPrismicPreviewProps } from 'gatsby-plugin-prismic-previews/src/withPrismicPreview'
import { ThemePrismicData } from '../theme/types'
import { ThemeWrapper } from '../theme/ThemeWrapper'

interface DynamicPageProps extends UnknownRecord {
  prismicTheme: {
    data: ThemePrismicData
  },
  prismicPageDynamic: {
    data: {
      page_title: string,
      body: Array<SliceData>
    }
  }
}

const DynamicPage: React.ComponentType<gatsby.PageProps<DynamicPageProps> & WithPrismicPreviewProps<DynamicPageProps>> = ({ data }) => {
  if (!data) return null
  const page = data.prismicPageDynamic
  const themeValues = data.prismicTheme.data as ThemePrismicData

  return (
    <ThemeWrapper themeValues={themeValues} isRootTheme={true}>
      <Layout>
        <SEO title={page.data.page_title} />
        <SliceZone sliceZone={page.data.body} />
      </Layout>
    </ThemeWrapper>
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
        ...Theme
    }

`

export default withPrismicPreview(DynamicPage, [
  previewConfig,
])
