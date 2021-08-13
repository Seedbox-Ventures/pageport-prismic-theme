// 404.js file

import * as React from 'react'
import { componentResolverFromMap, withPrismicUnpublishedPreview } from 'gatsby-plugin-prismic-previews'
import { linkResolver } from '../utils/LinkResolver'
import HomeTemplate from './index'
import PageTemplate from './{PrismicPage.url}'

const NotFoundPage = () => {
  return (
    <div>
      <h1>Not found</h1>
    </div>
  )
}

export default withPrismicUnpublishedPreview(
  NotFoundPage,
  [
    {
      repositoryName: process.env.PRISMIC_REPO_NAME,
      accessToken: process.env.PRISMIC_API_KEY,
      linkResolver,
      componentResolver: componentResolverFromMap({
        homepage: HomeTemplate,
        page: PageTemplate,
      }),
    },
  ],
)
