import * as React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components'

export enum LinkTarget {
  Self = '_self',
  Blank = '_blank',
  Parent = '_parent',
  Top = '_top',
}

export interface LinkProps {
  internal?: boolean
  url?: string
  target?: LinkTarget
  onClick?: () => void
}

const StyledLink = styled.div<{
  as?: React.ElementType
}>`
  cursor: pointer;
  text-decoration: underline;
`

export const Link: React.FC<LinkProps> = ({ url, target, internal, onClick, children }) => {
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
