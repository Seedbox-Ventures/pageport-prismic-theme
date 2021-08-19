import * as React from 'react'
import { createGlobalStyle } from 'styled-components'
import { ThemeTextType } from './types'

const StyleComponent = createGlobalStyle<{}>(({ theme }) => {
  return `
  body {
    ${theme.renderTextTypeCss(ThemeTextType.StandardText)}
  }
`
})

export const GlobalStyle: React.FC = () => {
  return <>
    <StyleComponent />
  </>
}

