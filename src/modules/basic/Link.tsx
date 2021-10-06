import * as React from 'react'
import { ReactNode } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { ThemeColorType, ThemeLinkInteractiveStyle } from '../../theme'

export enum LinkTarget {
  Self = '_self',
  Blank = '_blank',
  Parent = '_parent',
  Top = '_top',
}

export interface LinkStyle {
  color?: ThemeColorType
  underline?: boolean
  activeStyle?: ThemeLinkInteractiveStyle
  activeColor?: ThemeColorType
  hoverStyle?: ThemeLinkInteractiveStyle
  hoverColor?: ThemeColorType
}

export interface LinkProps extends LinkStyle {
  internal: boolean
  url: string
  target?: LinkTarget
  children?: ReactNode | string
}

const Link: React.FC<LinkProps> = ({ url, target, internal, children }) => {
  if (internal && url) {
    return (
      <GatsbyLink to={url} target={target}>
        {children}
      </GatsbyLink>
    )
  }

  return (
    <a href={url} target={target}>
      {children}
    </a>
  )
}

export default Link
