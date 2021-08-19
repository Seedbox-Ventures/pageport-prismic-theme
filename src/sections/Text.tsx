import * as React from 'react'
import { graphql } from 'gatsby'
import { RichText, RichTextBlock } from 'prismic-reactjs'

import { CustomLink } from '../utils/CustomLink'
import { SliceComponent, SliceData } from './index'
import { Section } from '../components/Section'
import { StyleHelper, ThemeBackgroundColor } from '../theme'
import styled from 'styled-components'

export interface TextProps {
  backgroundColor: ThemeBackgroundColor
  columns: number
  content: RichTextBlock[]
  paddingTop?: string
  paddingBottom?: string
}

const TextContainer = styled.div<{ columns: number }>(({ columns }) => {
  if (columns === 2) {
    return StyleHelper.renderCssFromObject({ 'column-count': '1|2', 'column-gap': '2rem|3rem' })
  }
  return ''
})

export const Text: SliceComponent<TextProps> = ({ backgroundColor, columns, content, paddingTop, paddingBottom }) => {
  return (
    <Section {...{ backgroundColor, paddingTop, paddingBottom }}>
      <TextContainer columns={columns}>
        <RichText
          render={content}
          serializeHyperlink={CustomLink}
        />
      </TextContainer>
    </Section>
  )
}

Text.mapSliceDataToProps = (sliceData: SliceData) =>
  ({
      backgroundColor: sliceData.primary.background_color as ThemeBackgroundColor,
      columns: sliceData.primary.columns === '2 Columns' ? 2 : 1,
      content: sliceData.primary.content?.raw,
      paddingTop: sliceData.primary.padding_top,
      paddingBottom: sliceData.primary.padding_bottom,
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
            padding_top
            padding_bottom
        }
    }
`
