import * as React from 'react'
import styled from 'styled-components'
import { ThemeBackgroundColor } from '../theme/types'
import { StyleHelper } from '../theme'


export interface SectionProps {
  backgroundColor: ThemeBackgroundColor
  isfullWidth: boolean
}

export const Section: React.FC<SectionProps> = ({ backgroundColor, isfullWidth = false, children }) => {

  const StyledSection = styled.section(({ theme }) => (
    `
    background-color: ${theme.getColorValueByType(backgroundColor)};
  `
  ))

  const ContentContainer = styled.div(({ theme }) => {
    const styleObj = {
      margin: '0 auto',
      padding: `${theme.values.contentPadding}`,
      'max-width': isfullWidth ? '100%' : theme.values.contentMaxWidth,
    }
    return StyleHelper.renderCssFromObject(styleObj)
  })

  return <StyledSection>
    <ContentContainer className='contentContainer'>
      {children}
    </ContentContainer>
  </StyledSection>
}
