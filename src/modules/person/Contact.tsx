import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { SocialMediaPlatform } from '../socialMedia/type'
import Link, { LinkProps } from '../basic/Link'
import Image, { ImageProps } from '../basic/Image'
import { Email } from '@mui/icons-material'
import { getIcon } from '../socialMedia/socialMedia'

export interface ContactLink extends LinkProps {
  mediaType: SocialMediaPlatform | 'Email'
}

export interface ContactProps {
  name?: string
  contactLinks?: Array<ContactLink>
  image?: ImageProps
}

const StyledContact = styled.div`
  display: inline-grid;
  column-gap: 2rem;
  .contact {
    &__image {
      grid-row-start: 1;
      grid-row-end: 4;
      grid-column-start: 1;
      grid-column-end: 2;

      img {
        border-radius: 9999999px;
      }
    }

    &__name {
      grid-row-start: 2;
      grid-row-end: 3;
      grid-column-start: 2;
      grid-column-end: 3;
      line-height: 2em;
    }

    &__links {
      grid-row-start: 3;
      grid-row-end: 4;
      grid-column-start: 2;
      grid-column-end: 3;
      
      a {
        margin-right: 1rem;
      }
    }
  }
`

function renderContactLinks(contactLinks?: ContactLink[]) {
  if (!contactLinks || contactLinks.length === 0) {
    return null
  }
  return (
    <div className={'contact__links'}>
      {_.map(contactLinks, ({ mediaType, ...linkProps }) => {
        const Icon = mediaType === 'Email' ? Email : getIcon(mediaType)
        return (
          <Link key={mediaType} {...linkProps}>
            <Icon />
          </Link>
        )
      })}
    </div>
  )
}

const Contact: React.FC<ContactProps> = ({ name, image, contactLinks }) => {
  return (
    <StyledContact className="contact">
      {image && <Image className="contact__image" {...image} />}
      {name && <div className={'contact__name'}>{name}</div>}
      {!!contactLinks && renderContactLinks(contactLinks)}
    </StyledContact>
  )
}

export default Contact
