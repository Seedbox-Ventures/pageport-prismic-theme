import * as React from 'react'
import styled from 'styled-components'
import { ThemeBackgroundColor } from '../theme/types'
import { StyleHelper } from '../theme'


export interface SectionProps {
  backgroundColor: ThemeBackgroundColor
  isFullWidth?: boolean
  paddingTop?: string
  paddingBottom?: string
}

const StyledSection = styled.section<{ backgroundColor: ThemeBackgroundColor }>(({ backgroundColor, theme }) => (
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
    margin: '0 auto',
    'max-width': isFullWidth ? '100%' : theme.values.contentMaxWidth,
    padding: StyleHelper.mergePaddings(theme.values.contentPadding, { top: paddingTop, bottom: paddingBottom }),
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
   }) => {
    return <StyledSection backgroundColor={backgroundColor}>
      <ContentContainer {...{ className: 'contentContainer', isFullWidth, paddingTop, paddingBottom }}>
        {children}
      </ContentContainer>
    </StyledSection>
  }
