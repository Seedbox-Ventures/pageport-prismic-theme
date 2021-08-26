import * as React from 'react'
import _ from 'lodash'
import { BreakPoint, BreakPointName, ResponsiveStyleMap, ThemeColorType } from '../../theme'
import { Section } from './Section'
import { graphql } from 'gatsby'
import { DataComponent } from './types'
import PagePort from '../../utils/PagePort'


export enum LogoPosition {
  Left = 'Left',
  Right = 'Right'
}

export interface HeaderData {
  'background_color': ThemeColorType,
  'header_burger_menu_breakpoint': BreakPointName | 'Never',
  'icon_as_logo_breakpoint': BreakPointName | 'Never',
  'logo_position': boolean,
  'logo_width': string
}

export interface HeaderProps {
  backgroundColor?: ThemeColorType,
  logoPosition?: LogoPosition,
  logoWidth?: ResponsiveStyleMap,
  iconBreakPoint?: BreakPointName
  menuBreakPoint?: BreakPoint
}

export const Header: DataComponent<HeaderProps, HeaderData> = ({ backgroundColor = ThemeColorType.Primary }) => {
  return (
    <Section as='header' backgroundColor={backgroundColor}>

    </Section>
  )
}

Header.mapDataToProps = (headerData) => {
  const { theme: { defaultData: themeDefaults } } = PagePort.config
  const { background_color } = _.merge(themeDefaults, headerData)


  return {
    backgroundColor: background_color,
  }
}

export const query = graphql`
    fragment PageHeader on PrismicHeader {
        data {
            background_color
            header_burger_menu_breakpoint
            icon_as_logo_breakpoint
            logo_position
            logo_width
        }
    }
`

