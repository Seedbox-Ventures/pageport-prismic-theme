import * as React from 'react'
import { useEffect } from 'react'
import * as gatsby from 'gatsby'
import { graphql } from 'gatsby'
import { UnknownRecord, withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { WithPrismicPreviewProps } from 'gatsby-plugin-prismic-previews/src/withPrismicPreview'
import { Theme, ThemeData, ThemeWrapper } from '../theme'
import { linkResolver } from '../utils/LinkResolver'
import { useAppDispatch } from '../state/hooks'
import { receiveUserDataSettings } from '../modules/userDataManagement/userDataSlice'
import { UserDataSettingsData } from '../modules/userDataManagement/types'
import UserDataManager from '../modules/userDataManagement/UserDataManager'
import ContactSection from '../sections/ContactSection'
import SliceZone, { SliceData } from '../modules/page/SliceZone'
import SEO from '../modules/page/Seo'
import Footer from '../modules/page/Footer'
import CallToAction from '../sections/CallToAction'
import Header, { HeaderData } from '../modules/page/Header'
import TextSection from '../sections/TextSection'
import EmailProvider from '../services/email/EmailContext'
import { EmailProviderInputData } from '../services/email/type'

interface SiteSettingsData extends UserDataSettingsData, EmailProviderInputData {}

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

    const emailProviderProps = EmailProvider.mapDataToProps(data.prismicSiteSettings.data)
    const themeProps = Theme.mapDataToProps(data.prismicTheme.data)
    const dispatch = useAppDispatch()

    useEffect(() => {
      dispatch(receiveUserDataSettings(data.prismicSiteSettings.data))
    })

    return (
      <EmailProvider {...emailProviderProps}>
        <ThemeWrapper themeProps={themeProps} isRootTheme={true}>
          <SEO title={title} />
          <Header {...Header.mapDataToProps(headerData)} />
          <SliceZone
            slicesData={slices}
            sliceComponentMap={{
              call_to_action: CallToAction,
              contact: ContactSection,
              text: TextSection,
            }}
          />
          <Footer />
          <UserDataManager />
        </ThemeWrapper>
      </EmailProvider>
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
          ...PageDynamicDataBodyContact
          ...PageDynamicDataBodyText
        }
        header_ref {
          document {
            ...PageHeader
          }
        }
      }
    }
    ...Theme
    ...EmailSettings
    ...UserDataSettings
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
