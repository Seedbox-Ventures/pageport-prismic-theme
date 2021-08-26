import * as React from 'react'
import styled from 'styled-components'
import { StyleHelper, ThemeColorType } from '../../theme'

export interface SectionProps {
  backgroundColor: ThemeColorType
  isFullWidth?: boolean
  paddingTop: string
  paddingBottom: string
  as?: React.ElementType
}

const StyledSection = styled.div<{ as?: React.ElementType, backgroundColor: ThemeColorType }>(
  ({
     backgroundColor,
     theme,
   }) => (
    `
    color: ${theme.getTextColorValueByBackground(backgroundColor)};
    background-color: ${theme.getColorValueByType(backgroundColor)};
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
     children,
     as = 'section',
   }) => {

    return <StyledSection {...{ as, backgroundColor }}>
      <ContentContainer {...{ className: 'contentContainer', isFullWidth, paddingTop, paddingBottom }}>
        {children}
      </ContentContainer>
    </StyledSection>
  }
