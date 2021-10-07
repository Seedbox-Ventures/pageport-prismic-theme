import * as React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

interface SEOProps {
  description?: string
  lang?: string
  meta?: Array<{ name: string; content: string }>
  title: string
}

const SEO: React.FC<SEOProps> = ({ description, title }) => {
  const queryData = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  const metaTitle = title ? `${title} | ${queryData.site?.siteMetadata?.title}` : queryData.site?.siteMetadata?.title
  const metaDescription = description || queryData.site?.siteMetadata?.description

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
    </Helmet>
  )
}

export default SEO
