import * as React from 'react'
import { graphql } from 'gatsby'
import { RichText, RichTextBlock } from 'prismic-reactjs'

import { CustomLink } from '../utils/CustomLink'
import { ContainerSpacing, ThemeBackgroundColor, ThemeButtonType, ThemeColorType } from '../theme'
import styled from 'styled-components'
import { ButtonLink, ButtonLinkProps } from '../modules/basic/Button'
import { PrismicHelper, PrismicLinkData } from '../utils/Prismic'
import { SliceComponent, SliceData } from '../modules/page/SliceZone'
import Section from '../modules/page/Section'

export interface CallToActionProps {
  backgroundColor: ThemeBackgroundColor
  title: string
  text?: RichTextBlock[]
  buttons: Array<ButtonLinkProps>
  padding?: Partial<ContainerSpacing>
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

const CallToAction: SliceComponent<CallToActionProps> = ({ backgroundColor, title, text, buttons, padding }) => {
  return (
    <Section {...{ backgroundColor, padding }}>
      <CallToActionContainer>
        <CallToActionTitle>{title}</CallToActionTitle>
        {text && text.length > 0 && text[0] && text[0].spans && text[0].spans.length > 0 && (
          <CallToActionTextWrapper>
            <RichText render={text} serializeHyperlink={CustomLink} />
          </CallToActionTextWrapper>
        )}
        <CallToActionButtons>
          {buttons.map((button, i) => (
            <ButtonLink key={i} {...button} />
          ))}
        </CallToActionButtons>
      </CallToActionContainer>
    </Section>
  )
}

CallToAction.mapDataToProps = (sliceData: SliceData) => {
  return {
    backgroundColor: sliceData.primary?.background_color ?? ThemeColorType.BackgroundDefault,
    title: sliceData.primary.title,
    text: sliceData.primary.text?.raw,
    padding: { top: sliceData.primary.padding_top, bottom: sliceData.primary.padding_bottom },
    buttons: !sliceData.items?.length
      ? []
      : sliceData.items.map(
          (item: {
            button_type: ThemeButtonType
            button_text: string
            button_link: PrismicLinkData
          }): ButtonLinkProps => {
            return {
              ...PrismicHelper.prismicLinkToLinkProps(item.button_link)!,
              children: item.button_text,
              type: item.button_type,
            }
          },
        ),
  }
}

export default CallToAction

export const query = graphql`
  fragment PageDynamicDataBodyCallToAction on PrismicPageDynamicDataBodyCallToAction {
    id
    primary {
      title
      text {
        text
      }
      background_color
      padding_top
      padding_bottom
    }
    items {
      button_link {
        url
        target
        link_type
      }
      button_text
      button_type
    }
  }
`
