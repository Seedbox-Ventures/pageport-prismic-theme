// Text.js file

import * as React from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'

import { CustomLink } from '../utils/CustomLink'
import { Slice } from './index'

export const Text: Slice = ({ data }) => {
  const columnClass =
    data.primary.columns === '2 Columns'
      ? 'text-section-2col'
      : 'text-section-1col'

  return (
    <section className={`content-section ${columnClass}`}>
      <RichText
        render={data.primary.content.raw()}
        serializeHyperlink={CustomLink}
      />
    </section>
  )
}

export const query = graphql`
    fragment PageDynamicDataBodyText on PrismicPageDynamicDataBodyText {
        primary {
            columns
            content {
                raw
            }
        }
    }
`
