import * as React from 'react'
import { ReactNode } from 'react'
import { Link as GatsbyLink } from 'gatsby'

export enum LinkTarget {
  Self = '_self',
  Blank = '_blank',
  Parent = '_parent',
  Top = '_top',
}

export interface LinkProps {
  internal: boolean
  url: string
  target?: LinkTarget
  children?: ReactNode | string
  onClick?: () => void
}

export const Link: React.FC<LinkProps> = ({ url, target, internal, onClick, children }) => {
  if (internal) {
    return (
      <GatsbyLink to={url} target={target} onClick={onClick}>
        {children}
      </GatsbyLink>
    )
  }

  return (
    <a href={url} target={target} onClick={onClick}>
      {children}
    </a>
  )
}
