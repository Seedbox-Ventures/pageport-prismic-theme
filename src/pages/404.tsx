import * as React from 'react'
import { linkResolver } from '../utils/LinkResolver'
import PageTemplate from './{PrismicPageDynamic.url}'

const NotFoundPage = () => {
  return (
    <div>
      <h1>Not found</h1>
    </div>
  )
}

export default (() => {
  if (process.env.PRISMIC_PREVIEW === '1') {
    const { componentResolverFromMap, withPrismicUnpublishedPreview } = require('gatsby-plugin-prismic-previews')
    return withPrismicUnpublishedPreview(
      NotFoundPage,
      [
        {
          repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME!,
          // @ts-ignore
          accessToken: process.env.GATSBY_PRISMIC_API_KEY!,
          linkResolver,
          componentResolver: componentResolverFromMap({
            page_dynamic: PageTemplate,
          }),
        },
      ],
    )
    return NotFoundPage
  }
})()
