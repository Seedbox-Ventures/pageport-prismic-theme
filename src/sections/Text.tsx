import * as React from 'react'
import { graphql } from 'gatsby'
import { RichText, RichTextBlock } from 'prismic-reactjs'

import { CustomLink } from '../utils/CustomLink'
import { SliceComponent, SliceData } from './index'
import { Section } from '../components/Section'
import { ThemeBackgroundColor } from '../theme'

export interface TextProps {
  backgroundColor: ThemeBackgroundColor,
  columns: number,
  content: RichTextBlock[]
}

export const Text: SliceComponent<TextProps> = ({ backgroundColor, content }) => {
  return (
    <Section backgroundColor={backgroundColor}>
      <RichText
        render={content}
        serializeHyperlink={CustomLink}
      />
    </Section>
  )
}

Text.mapSliceDataToProps = (sliceData: SliceData) =>
  ({
      backgroundColor: sliceData.primary.background_color as ThemeBackgroundColor,
      columns: sliceData.primary.columns === '2 Columns' ? 2 : 1,
      content: sliceData.primary.content?.raw,
    }
  )


export const query = graphql`
    fragment PageDynamicDataBodyText on PrismicPageDynamicDataBodyText {
        primary {
            background_color
            columns
            content {
                raw
            }
        }
    }
`
