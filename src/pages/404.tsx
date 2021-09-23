import * as React from 'react'
import { componentResolverFromMap, withPrismicUnpublishedPreview } from 'gatsby-plugin-prismic-previews'
import { linkResolver } from '../utils/LinkResolver'
import PageTemplate from './{PrismicPageDynamic.url}'

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
