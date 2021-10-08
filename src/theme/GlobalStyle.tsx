import * as React from 'react'
import { ReactNodeArray, useContext } from 'react'
import _ from 'lodash'
import { createGlobalStyle, ThemeContext } from 'styled-components'
import { ThemeTextType } from './types'
import { Helmet } from 'react-helmet'

const StyleComponent = createGlobalStyle<{}>(
  ({ theme }) => `
  body {
    ${theme.renderTextTypeCss(ThemeTextType.StandardText)}
  }
  
  h1 {
    ${theme.renderTextTypeCss(ThemeTextType.PageTitle)}
  }
  
  h2 {
    ${theme.renderTextTypeCss(ThemeTextType.SectionTitle)}
  }
  
  h3 {
    ${theme.renderTextTypeCss(ThemeTextType.SubTitle)}
  }
`,
)

export const GlobalStyle: React.FC = () => {
  const themeContext = useContext(ThemeContext)
  const fontLinks: ReactNodeArray = _.map(
    _.omitBy([themeContext.props.primaryFontImportLink, themeContext.props.secondaryFontImportLink], _.isEmpty),
    (link, i) => {
      return <link key={`font-import${i}`} rel="stylesheet" href={link.url} />
    },
  )

  return (
    <>
      {fontLinks.length && <Helmet>{fontLinks}</Helmet>}

      <StyleComponent />
    </>
  )
}
