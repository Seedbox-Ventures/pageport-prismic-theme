import * as React from 'react'
import { linkResolver } from '../utils/LinkResolver'

const PreviewPage = () => {
  return (
    <div>
      <h1>Loading preview…</h1>
    </div>
  )
}

export default (() => {
  if (process.env.PRISMIC_PREVIEW === '1') {
    const { withPrismicPreviewResolver } = require('gatsby-plugin-prismic-previews')

    return withPrismicPreviewResolver(PreviewPage, [
      {
        repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME!,
        // @ts-ignore
        accessToken: process.env.GATSBY_PRISMIC_API_KEY!,
        linkResolver,
      },
    ])
  }
  return PreviewPage
})()
