import * as React from 'react'
import _ from 'lodash'
import { BreakPoint, BreakPointName, ThemeColorType, ThemeLinkInteractiveStyle, ThemeTextType } from '../../theme'
import { Section } from './Section'
import { DataComponent } from './types'
import { getImage, ImageDataLike } from 'gatsby-plugin-image'
import { IGatsbyImageData } from 'gatsby-plugin-image/dist/src/components/gatsby-image.browser'
import PagePort from '../../utils/PagePort'
import { graphql } from 'gatsby'
import { PPGatsbyImage } from '../ui/Image'
import { DataHelper, PrismicLinkData } from '../../utils/Prismic'
import { Link, LinkProps } from '../ui/Link'
import { Navigation, NavigationItemProps, NavigationProps, NavItemType } from '../ui/Navigation'

export enum LogoPosition {
  Left = 'Left',
  Right = 'Right',
}

interface HeaderLogoProps {
  image?: IGatsbyImageData
  alt: string
  width: string
  link?: LinkProps
}

export interface HeaderData {
  background_color: ThemeColorType
  burger_menu_breakpoint: BreakPointName | 'Never'
  logo_position: boolean
  logo_width: string
  logo_link?: PrismicLinkData
  logo: {
    gatsbyImageData?: ImageDataLike
    alt?: string
  }
  link_text_type: ThemeTextType
  link_color: ThemeColorType
  link_active_color: ThemeColorType
  link_active_style: ThemeLinkInteractiveStyle
  link_hover_color: ThemeColorType
  link_hover_style: ThemeLinkInteractiveStyle
  links: Array<{
    text?: string
    type?: NavItemType
    link?: PrismicLinkData
  } | null>
  is_sticky: boolean
  padding_bottom: string
  padding_top: string
}

export interface HeaderProps {
  backgroundColor?: ThemeColorType
  logoPosition?: LogoPosition
  logo?: HeaderLogoProps
  menuBreakPoint?: BreakPoint
  isSticky?: boolean
  paddingTop: string
  paddingBottom: string
  links?: Array<NavigationItemProps>
  linkTextType: ThemeTextType
  linkColor: ThemeColorType
  linkActiveColor: ThemeColorType
  linkActiveStyle: ThemeLinkInteractiveStyle
  linkHoverColor: ThemeColorType
  linkHoverStyle: ThemeLinkInteractiveStyle
}

export const Header: DataComponent<HeaderProps, HeaderData> = ({
  backgroundColor = ThemeColorType.Primary,
  isSticky = false,
  paddingTop,
  paddingBottom,
  logo,
  logoPosition = LogoPosition.Left,
  links = [],
  linkTextType,
  linkColor,
  linkActiveStyle,
  linkActiveColor,
  linkHoverStyle,
  linkHoverColor,
}) => (
  <Section
    as="header"
    backgroundColor={backgroundColor}
    {...{
      isSticky,
      paddingTop,
      paddingBottom,
      flexDirection: logoPosition === LogoPosition.Right ? 'row-reverse' : 'row',
    }}
  >
    {renderLogo(logo)}
    {renderNavigation({
      items: links,
      textType: linkTextType,
      linkColor,
      linkActiveStyle,
      linkActiveColor,
      linkHoverStyle,
      linkHoverColor,
      align: 'horizontal',
      customCss: { padding: '0 2rem' },
    })}
  </Section>
)

//items={navigationItems} align="horizontal" customCss={}

Header.mapDataToProps = (headerData) => {
  const {
    header: { defaultData: headerDefaults },
  } = PagePort.config

  const {
    background_color,
    logo,
    logo_width = '40px|60px',
    logo_position,
    logo_link,
    padding_top,
    padding_bottom,
    is_sticky,
    links,
    link_text_type = ThemeTextType.Header,
    link_color = ThemeColorType.DarkText,
    link_active_style = ThemeLinkInteractiveStyle.ChangeColor,
    link_active_color = ThemeColorType.Accent,
    link_hover_style = ThemeLinkInteractiveStyle.ChangeColor,
    link_hover_color = ThemeColorType.Accent,
  } = _.merge(headerDefaults as Partial<HeaderData>, _.omitBy(_.omitBy(headerData, _.isNull), _.isUndefined))

  const props: HeaderProps = {
    backgroundColor: background_color,
    logoPosition: logo_position === true ? LogoPosition.Right : LogoPosition.Left,
    paddingTop: padding_top ?? '1rem',
    paddingBottom: padding_bottom ?? '1rem',
    isSticky: is_sticky,
    linkTextType: link_text_type,
    linkColor: link_color,
    linkActiveStyle: link_active_style,
    linkActiveColor: link_active_color,
    linkHoverStyle: link_hover_style,
    linkHoverColor: link_hover_color,
    links:
      links && links.length
        ? _.compact(
            _.map(links, (navItem) => {
              if (!navItem?.link) {
                return undefined
              }
              const linkProps = DataHelper.prismicLinkToLinkProps(navItem.link)
              if (!linkProps) {
                return undefined
              }

              const { type, text } = navItem

              return {
                ...linkProps,
                ...{
                  children: text,
                  type: type ?? 'Link',
                },
              }
            }),
          )
        : undefined,
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
    return <Link {...link}>{logo}</Link>
  }

  return logo
}

function renderNavigation(navigationProps: NavigationProps): React.ReactFragment | null {
  if (!navigationProps?.items || navigationProps.items.length === 0) {
    return null
  }
  return <Navigation {...navigationProps} />
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
      link_text_type
      link_color
      link_active_color
      link_active_style
      link_hover_color
      link_hover_style
      links {
        type
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
