// preview.js file

import * as React from 'react'
import { withPrismicPreviewResolver } from 'gatsby-plugin-prismic-previews'
import { linkResolver } from '../utils/LinkResolver'

const PreviewPage = () => {
  return (
    <div>
      <h1>Loading preview…</h1>
    </div>
  )
}

export default withPrismicPreviewResolver(PreviewPage, [
  {
    repositoryName: process.env.PRISMIC_REPO_NAME,
    accessToken: process.env.PRISMIC_API_KEY,
    linkResolver,
  },
])
