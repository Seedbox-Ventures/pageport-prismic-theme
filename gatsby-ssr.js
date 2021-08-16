// gatsby-ssr.js and gatsby-browser.js files

import * as React from 'react'
import { PrismicPreviewProvider } from 'gatsby-plugin-prismic-previews'

import 'gatsby-plugin-prismic-previews/dist/styles.css'

import './src/theme/reset.css'
import { graphql } from 'gatsby'

export const wrapRootElement = ({ element }) => (
  <PrismicPreviewProvider>{element}</PrismicPreviewProvider>
)

// export const query = graphql`
//     fragment ThemeData
// `
