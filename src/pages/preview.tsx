import * as React from 'react'
import { withPrismicPreviewResolver } from 'gatsby-plugin-prismic-previews'
import { previewConfig } from '../utils/Prismic'

const PreviewPage = () => {
  return (
    <div>
      <h1>Loading preview…</h1>
    </div>
  )
}

export default withPrismicPreviewResolver(PreviewPage, [
  previewConfig,
])
