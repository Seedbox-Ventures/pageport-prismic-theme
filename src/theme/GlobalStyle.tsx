import * as React from 'react'
import { createGlobalStyle } from 'styled-components'

// export const getGlobalStyle = (themeValues: ThemeValues): GlobalStyleComponent<ThemeValues, DefaultTheme> => {
//   const standardType = ThemeHelper.getStandardType(themeValues)
//
// }

// const StyleContainer = createGlobalStyle`
//   body {
//     color: ${props => (props.whiteColor ? 'white' : 'black')};
//     font-family: ${props => props.theme.fontFamily};
//   }
// `

const StyleComponent = createGlobalStyle<{}>(({ theme }) => {
  return `
  body {
    ${theme.renderTypeCss(theme.getStandardType())}
  }
`
})

export const GlobalStyle: React.FC = () => {
  return <>
    <StyleComponent />
  </>
}

