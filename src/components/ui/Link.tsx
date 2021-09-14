import * as React from 'react'
import { Link as GatsbyLink } from 'gatsby'

export enum LinkTarget {
  SELF = '_self',
  BLANK = '_blank',
  PARENT = '_parent',
  TOP = '_top',
}

export interface LinkProps {
  internal: boolean,
  url: string,
  target?: LinkTarget,
  children?: React.ReactNode,
}

export const Link: React.FC<LinkProps> =
  ({
     url,
     target,
     internal,
     children,
   }) => {
    if (internal) {
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
