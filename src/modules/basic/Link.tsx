import * as React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components'
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

export interface StyledLinkProps extends LinkStyle, BasicLinkProps {
  as?: React.ElementType
}

export interface BasicLinkProps {
  internal?: boolean
  url?: string
  target?: LinkTarget
  onClick?: React.MouseEventHandler<HTMLElement>
  children?: React.ReactNode
}

export interface LinkProps extends BasicLinkProps, LinkStyle {
}

const StyledLink = styled.div<StyledLinkProps>(
  ({ underline = true }) => `
  cursor: pointer;
  text-decoration: ${underline ? 'underline' : 'none'};
`,
)

const Link: React.FC<LinkProps> = ({ url, target, internal, onClick, children }) => {
  if (internal && url) {
    return (
      <StyledLink as={GatsbyLink} to={url} target={target} onClick={onClick}>
        {children}
      </StyledLink>
    )
  }

  return (
    <StyledLink as="a" href={url} target={target} onClick={onClick}>
      {children}
    </StyledLink>
  )
}

export default Link
