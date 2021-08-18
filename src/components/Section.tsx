import * as React from 'react'
import styled from 'styled-components'
import { ThemeBackgroundColor } from '../theme/types'
import { StyleHelper } from '../theme'


export interface SectionProps {
  backgroundColor: ThemeBackgroundColor
  isFullWidth: boolean
}

const StyledSection = styled.section<{backgroundColor: ThemeBackgroundColor}>(({ backgroundColor, theme }) => (
  `
    background-color: ${theme.getColorValueByType(backgroundColor)};
  `
))

const ContentContainer = styled.div<{isFullWidth: boolean}>(({ isFullWidth, theme }) => {
  const styleObj = {
    margin: '0 auto',
    padding: `${theme.values.contentPadding}`,
    'max-width': isFullWidth ? '100%' : theme.values.contentMaxWidth,
  }
  return StyleHelper.renderCssFromObject(styleObj)
})

export const Section: React.FC<SectionProps> = ({ backgroundColor, isFullWidth = false, children }) => {
  return <StyledSection backgroundColor={backgroundColor}>
    <ContentContainer className='contentContainer' isFullWidth={isFullWidth}>
      {children}
    </ContentContainer>
  </StyledSection>
}
