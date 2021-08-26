import * as React from 'react'
import styled from 'styled-components'
import { StyleHelper, ThemeColorType } from '../../theme'

export interface SectionProps {
  backgroundColor: ThemeColorType
  isFullWidth?: boolean
  paddingTop: string
  paddingBottom: string
  as?: React.ElementType
  isSticky?: boolean
}

const StyledSection = styled.div<{ as?: React.ElementType, backgroundColor: ThemeColorType, isSticky: boolean }>(
  ({
     backgroundColor,
     isSticky,
     theme,
   }) => (
    `
    color: ${theme.getTextColorValueByBackground(backgroundColor)};
    background-color: ${theme.getColorValueByType(backgroundColor)};
    position: ${isSticky ? 'sticky' : 'static'};
    width: 100%;
  `
  ))


const ContentContainer = styled.div<{ isFullWidth: boolean, paddingTop?: string, paddingBottom?: string }>
(({
    isFullWidth,
    paddingTop,
    paddingBottom,
    theme,
  }) => {
  const styleObj: Record<string, string> = {
    position: 'relative',
    margin: '0 auto',
    'max-width': isFullWidth ? '100%' : theme.props.contentMaxWidth,
    padding: StyleHelper.mergePaddings(theme.props.contentPadding, { top: paddingTop, bottom: paddingBottom }),
  }
  return StyleHelper.renderCssFromObject(styleObj)
})

export const Section: React.FC<SectionProps> =
  ({
     backgroundColor,
     isFullWidth = false,
     paddingTop,
     paddingBottom,
     isSticky = false,
     children,
     as = 'section',
   }) => {

    return <StyledSection {...{ as, backgroundColor, isSticky }}>
      <ContentContainer {...{ className: 'contentContainer', isFullWidth, paddingTop, paddingBottom }}>
        {children}
      </ContentContainer>
    </StyledSection>
  }
