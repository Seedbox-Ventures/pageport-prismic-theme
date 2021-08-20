import * as React from 'react'
import { ReactNodeArray, useContext } from 'react'
import _ from 'lodash'
import { createGlobalStyle, ThemeContext } from 'styled-components'
import { ThemeTextType } from './types'
import { Helmet } from 'react-helmet'

const StyleComponent = createGlobalStyle<{}>(({ theme }) => {
  return `
  body {
    ${theme.renderTextTypeCss(ThemeTextType.StandardText)}
  }
`
})

export const GlobalStyle: React.FC = () => {
  const themeContext = useContext(ThemeContext)
  const fontLinks: ReactNodeArray = _.map(_.omitBy([themeContext.values.primaryFontImportLink, themeContext.values.secondaryFontImportLink], _.isEmpty), (link, i) => {
    return <link key={`font-import${i}`} rel='stylesheet' href={link.url} />
  })

  return <>
    {
      fontLinks.length
      && <Helmet>
        {fontLinks}
      </Helmet>
    }

    <StyleComponent />
  </>
}

