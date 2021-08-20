import * as React from 'react'
import { ReactNode } from 'react'
import _ from 'lodash'
import { ThemeProvider } from 'styled-components'
import { ThemePrismicData, ThemeValues } from './types'
import { graphql } from 'gatsby'
import { theme as themeConfig } from '../../pageport-config'
import { Theme } from './Theme'
import { GlobalStyle } from './GlobalStyle'

export interface ThemeWrapperProps {
  children: ReactNode | undefined
  themeValues?: Partial<ThemeValues> | ThemePrismicData
  isRootTheme: boolean
}

export const defaultValues: ThemeValues = Theme.mapThemingData(themeConfig.defaultValues) as ThemeValues

export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ themeValues, children, isRootTheme = false }) => {

  const prismicThemeValues: Partial<ThemeValues> = themeValues ? Theme.mapThemingData(themeValues) : {}
  const mergedThemeValues: ThemeValues = _.merge(defaultValues, prismicThemeValues)


  const theme = new Theme(mergedThemeValues)

  return (
    <ThemeProvider theme={theme}>
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
                button_padding
                button_border_radius
                button_border_width
                button_box_shadow
                buttons {
                  button_type
                  color
                  fill_background
                  hover_effect
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
