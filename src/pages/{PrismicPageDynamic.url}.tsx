import * as React from 'react'
import * as gatsby from 'gatsby'
import { graphql } from 'gatsby'
import { UnknownRecord, withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { Footer, Header, HeaderData, SEO, SliceData, SliceZone } from '../modules/page'
import { WithPrismicPreviewProps } from 'gatsby-plugin-prismic-previews/src/withPrismicPreview'
import { Theme, ThemeData, ThemeWrapper } from '../theme'
import { linkResolver } from '../utils/LinkResolver'
import { SiteSettings, SiteSettingsData } from '../siteSettings/SiteSettings'
import { SiteContextProvider } from '../siteSettings/SiteContext'
import { CallToAction } from '../sections/CallToAction'
import { TextSection } from '../sections/TextSection'

interface DynamicPageProps extends UnknownRecord {
  prismicSiteSettings: {
    data: SiteSettingsData
  }
  prismicTheme: {
    data: ThemeData
  }
  prismicPageDynamic: {
    data: {
      page_title: string
      header_ref: {
        document: {
          data: HeaderData
        }
      }
      body: Array<SliceData>
    }
  }
}

const DynamicPage: React.ComponentType<gatsby.PageProps<DynamicPageProps> & WithPrismicPreviewProps<DynamicPageProps>> =
  ({ data }) => {
    if (!data?.prismicPageDynamic?.data?.header_ref?.document) return null
    const {
      page_title: title,
      body: slices,
      header_ref: {
        document: { data: headerData },
      },
    } = data.prismicPageDynamic.data
    const siteSettings = SiteSettings.mapDataToProps(data.prismicSiteSettings.data)
    const themeProps = Theme.mapDataToProps(data.prismicTheme.data)

    return (
      <SiteContextProvider siteSettings={siteSettings}>
        <ThemeWrapper themeProps={themeProps} isRootTheme={true}>
          <SEO title={title} />
          <Header {...Header.mapDataToProps(headerData)} />
          <SliceZone
            slicesData={slices}
            sliceComponentMap={{
              call_to_action: CallToAction,
              text: TextSection,
            }}
          />
          <Footer />
        </ThemeWrapper>
      </SiteContextProvider>
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
          ... on PrismicPageDynamicDataBodyCallToAction {
            id
          }
        }
        header_ref {
          document {
            ...PageHeader
          }
        }
      }
    }
    ...Theme
    ...SiteSettings
  }
`

export default withPrismicPreview(DynamicPage, [
  {
    repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME!,
    // @ts-ignore
    accessToken: process.env.GATSBY_PRISMIC_API_KEY!,
    linkResolver,
  },
])
