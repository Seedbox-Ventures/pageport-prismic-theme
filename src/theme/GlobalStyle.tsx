import { createGlobalStyle, DefaultTheme, GlobalStyleComponent } from 'styled-components'
import { ThemeHelper } from './ThemeHelper'
import { ThemeValues } from './types'

export const getGlobalStyle = (themeValues: ThemeValues): GlobalStyleComponent<ThemeValues, DefaultTheme> => {
  const standardType = ThemeHelper.getStandardType(themeValues)
  return createGlobalStyle<ThemeValues>`
    body, p {
      ${ThemeHelper.renderTypeCss(standardType.textType, themeValues)}
    }
  `
}

