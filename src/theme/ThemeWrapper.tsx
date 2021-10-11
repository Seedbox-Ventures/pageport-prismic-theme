import * as React from 'react'
import { ReactNode } from 'react'
import _ from 'lodash'
import { ThemeProvider } from 'styled-components'
import { graphql } from 'gatsby'
import { GlobalStyle } from './GlobalStyle'
import { ThemeProps } from './types'
import { Theme } from './Theme'
import PagePort from '../utils/PagePort'
import { ThemeProvider as MUIThemeProvider } from '@mui/material'

export interface ThemeWrapperProps {
  children: ReactNode | undefined
  themeProps?: Partial<ThemeProps>
  isRootTheme: boolean
}

export const defaultValues: ThemeProps = Theme.mapDataToProps(PagePort.config.theme.defaultData) as ThemeProps

export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ themeProps, children, isRootTheme = false }) => {
  const mergedThemeValues: ThemeProps = _.merge({}, defaultValues, themeProps)
  mergedThemeValues.colors = themeProps?.colors
    ? _.unionBy(Object.values(defaultValues.colors), Object.values(themeProps.colors), 'colorType')
    : defaultValues.colors
  const theme = new Theme(mergedThemeValues)

  return (
    <ThemeProvider theme={theme}>
      <MUIThemeProvider theme={theme.muiTheme}>
        {isRootTheme && <GlobalStyle />}
        {children}
      </MUIThemeProvider>
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
      }
    }
  }
`
