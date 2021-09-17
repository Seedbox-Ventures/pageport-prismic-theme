import * as React from 'react'
import { graphql } from 'gatsby'
import { RichText, RichTextBlock } from 'prismic-reactjs'

import { CustomLink } from '../utils/CustomLink'
import { SliceComponent, SliceData } from './index'
import { Section } from '../components/Section'
import { ThemeBackgroundColor, ThemeButtonType } from '../theme'
import styled from 'styled-components'
import { Button, ButtonProps } from '../components/Button'

export interface CallToActionProps {
  backgroundColor: ThemeBackgroundColor
  title: string
  text?: RichTextBlock[]
  buttons: Array<ButtonProps>
  paddingTop?: string
  paddingBottom?: string
}

const CallToActionContainer = styled.div`
  text-align: center;
`

const CallToActionTitle = styled.h2`
  font-size: 4rem;
  font-weight: 300;
  line-height: 1;
  margin: 0;
`

const CallToActionTextWrapper = styled.div`
  & > p {
    font-size: 1.25rem;
    line-height: 1.2;
  }
  
  margin: 2rem 0 0;
`

const CallToActionButtons = styled.div`
  font-size: 1.5rem;
  margin: 3rem 0 0;
`

export const CallToAction: SliceComponent<CallToActionProps> = ({ backgroundColor, title, text, buttons, paddingTop, paddingBottom }) => {
  return (
    <Section {...{ backgroundColor, paddingTop, paddingBottom }}>
      <CallToActionContainer>
        <CallToActionTitle>{title}</CallToActionTitle>
        {text && text.length > 0 && text[0] && text[0].spans && text[0].spans.length > 0 &&
          <CallToActionTextWrapper>
            <RichText
              render={text}
              serializeHyperlink={CustomLink}
            />
          </CallToActionTextWrapper>
        }
        <CallToActionButtons>
          {buttons.map((button, i) => (
            <Button key={i} text={button.text} link={button.link} type={button.type}/>
          ))}
        </CallToActionButtons>
      </CallToActionContainer>
    </Section>
  )
}

CallToAction.mapSliceDataToProps = (sliceData: SliceData) =>
  ({
      backgroundColor: sliceData.primary.background_color as ThemeBackgroundColor,
      title: sliceData.primary.title,
      text: sliceData.primary.text?.raw,
      paddingTop: sliceData.primary.padding_top,
      paddingBottom: sliceData.primary.padding_bottom,
      buttons: sliceData.items.map(
        (item: {
          button_type: ThemeButtonType;
          button_text: string;
          button_link: any
        }): ButtonProps => {
        return {
          type: item.button_type,
          text: item.button_text,
          link: item.button_link,
        }
      })
    }
  )


export const query = graphql`
    fragment PageDynamicDataBodyCallToAction on PrismicPageDynamicDataBodyCallToAction {
        primary {
            background_color
            title
            text {
                raw
            }
            padding_top
            padding_bottom
        }
        items {
            button_type
            button_text
            button_link {
                url
                link_type
                target
            }
        }
    }
`
