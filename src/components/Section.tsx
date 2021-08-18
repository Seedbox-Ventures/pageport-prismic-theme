// import * as React from 'react'
// import styled from 'styled-components'
//
// export const Section = styled.section`
//
// `

import { ThemeColorType } from '../theme/types'
import styled from 'styled-components'
import { ReactNode } from 'react'

export interface SectionProps {
  backgroundColor: ThemeColorType
  children: ReactNode | undefined
}

export const Section: React.FC<SectionProps> = ({children}) => {
  const StyledSection = styled.section`
    
  `

  return <StyledSection>
    {children}
  </StyledSection>
}
