import * as React from 'react'
import styled from 'styled-components'
import { StyleHelper, ThemeColorType } from '../../theme'
import * as CSS from 'csstype'

export interface SectionProps {
  backgroundColor: ThemeColorType
  isFullWidth?: boolean
  paddingTop?: string
  paddingBottom?: string
  as?: React.ElementType
  isSticky?: boolean
  flexDirection?: CSS.Property.FlexDirection
}

export const StyledSection = styled.div<{ as?: React.ElementType, backgroundColor: ThemeColorType, isSticky: boolean }>(
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


const ContentContainer = styled.div<{ isFullWidth: boolean, paddingTop?: string, paddingBottom?: string, flexDirection?: CSS.Property.FlexDirection }>
(({
    isFullWidth,
    paddingTop,
    paddingBottom,
    flexDirection = 'column',
    theme,
  }) => {
  const styleObj: Record<string, string> = {
    display: 'flex',
    'flex-direction': flexDirection,
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
     flexDirection,
     isSticky = false,
     children,
     as = 'section',
   }) => {

    return <StyledSection {...{ as, backgroundColor, isSticky }}>
      <ContentContainer {...{ className: 'contentContainer', isFullWidth, paddingTop, paddingBottom, flexDirection }}>
        {children}
      </ContentContainer>
    </StyledSection>
  }
