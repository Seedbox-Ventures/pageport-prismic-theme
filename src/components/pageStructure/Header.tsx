import * as React from 'react'
import { BreakPoint, BreakPointName, ThemeColorType } from '../../theme'
import { Section } from './Section'
import { DataComponent } from './types'
import { getImage, ImageDataLike } from 'gatsby-plugin-image'
import { IGatsbyImageData } from 'gatsby-plugin-image/dist/src/components/gatsby-image.browser'
import PagePort from '../../utils/PagePort'
import _ from 'lodash'
import { graphql } from 'gatsby'
import { PPGatsbyImage } from '../ui/Image'
import { DataHelper, PrismicLinkData } from '../../utils/Prismic'
import { Link, LinkProps } from '../ui/Link'
import { Navigation, NavigationItemProps, NavItemStyle } from '../ui/Navigation'

export enum LogoPosition {
  Left = 'Left',
  Right = 'Right'
}

interface HeaderLogoProps {
  image?: IGatsbyImageData,
  alt: string,
  width: string,
  link?: LinkProps
}

export interface HeaderData {
  background_color: ThemeColorType,
  burger_menu_breakpoint: BreakPointName | 'Never',
  logo_position: boolean,
  logo_width: string,
  logo_link?: PrismicLinkData,
  logo: {
    gatsbyImageData?: ImageDataLike,
    alt?: string
  },
  links: Array<{
    text?: string,
    style?: NavItemStyle,
    link?: PrismicLinkData
  } | null>
  is_sticky: boolean,
  padding_bottom: string
  padding_top: string
}

export interface HeaderProps {
  backgroundColor?: ThemeColorType,
  logoPosition?: LogoPosition,
  logo?: HeaderLogoProps,
  menuBreakPoint?: BreakPoint
  isSticky?: boolean,
  paddingTop: string,
  paddingBottom: string,
  links?: Array<NavigationItemProps>
}

export const Header: DataComponent<HeaderProps, HeaderData> = (
  {
    backgroundColor = ThemeColorType.Primary,
    isSticky = false,
    paddingTop,
    paddingBottom,
    logo,
    logoPosition = LogoPosition.Left,
    links,
  },
) => (
  <Section as='header' {...{
    backgroundColor,
    isSticky,
    paddingTop,
    paddingBottom,
    flexDirection: logoPosition === LogoPosition.Right ? 'row-reverse' : 'row',
  }}>
    {renderLogo(logo)}
    {renderNavigation(links)}
  </Section>
)


Header.mapDataToProps = (headerData) => {
  const { header: { defaultData: headerDefaults } } = PagePort.config
  const {
    background_color,
    logo,
    logo_width,
    logo_position,
    logo_link,
    padding_top,
    padding_bottom,
    is_sticky,
    links,
  } = _.merge(headerDefaults as Partial<HeaderData>, headerData)

  const props: HeaderProps = {
    backgroundColor: background_color,
    logoPosition: logo_position === true ? LogoPosition.Right : LogoPosition.Left,
    paddingTop: padding_top ?? '1rem',
    paddingBottom: padding_bottom ?? '1rem',
    isSticky: is_sticky,
    links: links && links.length ? _.compact(_.map(links, (navItem) => {
      if (!navItem?.link) {
        return undefined
      }
      const linkProps = DataHelper.prismicLinkToLinkProps(navItem.link)
      if (!linkProps) {
        return undefined
      }

      const { style, text } = navItem

      return {
        ...linkProps,
        ...{
          children: text,
          style: style ?? 'Link',
        },
      }
    })) : undefined,
  }

  if (!_.isEmpty(logo?.gatsbyImageData)) {
    props.logo = {
      image: getImage(logo!.gatsbyImageData!),
      alt: logo!.alt ?? '',
      width: logo_width,
      link: logo_link ? DataHelper.prismicLinkToLinkProps(logo_link) : undefined,
    }
  }

  return props
}

function renderLogo(headerLogoProps: HeaderLogoProps | undefined): React.ReactFragment | null {
  if (!headerLogoProps?.image) {
    return null
  }
  const { image, alt, width, link } = headerLogoProps
  const logo = <PPGatsbyImage {...{ image, alt, width }} />

  if (link?.url) {
    return (
      <Link {...link}>
        {logo}
      </Link>
    )
  }

  return logo
}

function renderNavigation(navigationItems?: Array<NavigationItemProps>): React.ReactFragment | null {
  if (!navigationItems || navigationItems.length === 0) {
    return null
  }
  return <Navigation items={navigationItems} />
}

export const query = graphql`
    fragment PageHeader on PrismicHeader {
        data {
            background_color
            burger_menu_breakpoint
            logo_position
            logo_width
            logo_link {
                url
                target
                link_type
            }
            logo {
                gatsbyImageData(placeholder: BLURRED)
            }
            links {
                style
                text
                link {
                    url
                    target
                }
            }
            is_sticky
            padding_bottom
            padding_top
        }
    }
`


