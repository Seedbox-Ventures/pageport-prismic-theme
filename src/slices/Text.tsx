import * as React from 'react'
import { graphql } from 'gatsby'
import { RichText, RichTextBlock } from 'prismic-reactjs'

import { CustomLink } from '../utils/CustomLink'
import { SliceComponent, SliceData } from './index'

export interface TextProps {
  columns: number,
  content: RichTextBlock[]
}

export const Text: SliceComponent<TextProps> = ({ columns, content }) => {
  const columnClass =
    columns === 2
      ? 'text-section-2col'
      : 'text-section-1col'

  return (
    <section className={`content-section ${columnClass}`}>
      <RichText
        render={content}
        serializeHyperlink={CustomLink}
      />
    </section>
  )
}

Text.mapSliceDataToProps = (sliceData: SliceData) =>
  ({
      columns: sliceData.primary.columns === '2 Columns' ? 2 : 1,
      content: sliceData.primary.content?.raw,
    }
  )

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
