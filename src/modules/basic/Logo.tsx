import { IGatsbyImageData } from 'gatsby-plugin-image/dist/src/components/gatsby-image.browser'
import Link, { LinkProps } from './Link'
import * as React from 'react'
import Image from './Image'

export interface LogoProps {
  image?: IGatsbyImageData
  alt?: string
  width?: string
  link?: LinkProps
}

export const Logo: React.FC<LogoProps> = ({ image, alt = '', width = '120px', link }) => {
  if (!image) {
    return null
  }

  const logo = <Image {...{ image, alt, width }} />

  if (link?.url) {
    return <Link {...link}>{logo}</Link>
  }

  return logo
}
