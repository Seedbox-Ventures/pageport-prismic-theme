import * as React from 'react'
import { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { ThemePrismicData, ThemeValues } from './types'
import { graphql } from 'gatsby'
import { theme as themeConfig } from '../../pageport-config'
import { ThemeHelper } from './ThemeHelper'
import { getGlobalStyle } from './GlobalStyle'

export interface ThemeWrapperProps {
  children: ReactNode | undefined
  themeValues?: Partial<ThemeValues> | ThemePrismicData
  isRootTheme: boolean
}

export const defaultValues: ThemeValues = ThemeHelper.mapThemingData(themeConfig.defaultValues) as ThemeValues

export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ themeValues, children, isRootTheme = false }) => {

  const prismicThemeValues: Partial<ThemeValues> = themeValues ? ThemeHelper.mapThemingData(themeValues) : {}
  const mergedThemeValues: ThemeValues = { ...defaultValues, ...prismicThemeValues }
  const GlobalStyle = getGlobalStyle(mergedThemeValues)

  return (
    <ThemeProvider theme={mergedThemeValues}>
      {isRootTheme && <GlobalStyle />}
      {children}
    </ThemeProvider>
  )
}


export const query = graphql`
    fragment Theme on Query {
        prismicTheme {
            _previewable
            data {
                colors {
                    color_type
                    value
                }
                content_padding
                content_max_width
                font_import_link {
                    url
                }
                icon {
                    alt
                    url
                }
                primary_font_family
                secondary_font_family
                type_definitions {
                    font_family
                    font_size
                    letter_spacing
                    line_height
                    text_type
                }
                logo_inverted {
                    alt
                    url
                }
                logo {
                    url
                    alt
                }
            }
        }
    }
`
