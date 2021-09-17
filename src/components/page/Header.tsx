import * as React from 'react'
import _ from 'lodash'
import {
  BreakPoint,
  BreakPointName,
  ThemeButtonType,
  ThemeColorType,
  ThemeLinkInteractiveStyle,
  ThemeTextType,
} from '../../theme'
import { Section } from './Section'
import { DataComponent } from './types'
import { getImage, ImageDataLike } from 'gatsby-plugin-image'
import { IGatsbyImageData } from 'gatsby-plugin-image/dist/src/components/gatsby-image.browser'
import PagePort from '../../utils/PagePort'
import { graphql } from 'gatsby'
import { PPGatsbyImage } from '../basic/Image'
import { DataHelper, PrismicLinkData } from '../../utils/Prismic'
import { Link, LinkProps } from '../basic/Link'
import { Navigation, NavigationProps } from '../basic/Navigation'
import { Button } from '../basic/Button'
import styled from 'styled-components'

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
    link?: PrismicLinkData
  } | null>
  cta_display?: boolean
  cta_text?: string
  cta_button_type?: ThemeButtonType
  cta_link?: PrismicLinkData
  is_sticky: boolean
  padding_bottom: string
  padding_top: string
}

export interface HeaderProps {
  burgerMenuBreakPoint?: BreakPointName | 'Never'
  backgroundColor?: ThemeColorType
  logoPosition?: LogoPosition
  logo?: HeaderLogoProps
  menuBreakPoint?: BreakPoint
  isSticky?: boolean
  paddingTop: string
  paddingBottom: string
  links?: Array<LinkProps>
  linkTextType: ThemeTextType
  linkColor: ThemeColorType
  linkActiveColor: ThemeColorType
  linkActiveStyle: ThemeLinkInteractiveStyle
  linkHoverColor: ThemeColorType
  linkHoverStyle: ThemeLinkInteractiveStyle
  ctaDisplay: boolean
  ctaText?: string
  ctaButtonType?: ThemeButtonType
  ctaLink?: LinkProps
}

export interface CTAProps {}

const customSectionContainerStyle = { 'flex-direction': 'row', 'justify-content': 'space-between' }

export const Header: DataComponent<HeaderProps, HeaderData> = ({
  burgerMenuBreakPoint = 'Never',
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
  ctaDisplay,
  ctaText,
  ctaButtonType,
  ctaLink,
}) => (
  <Section
    as="header"
    backgroundColor={backgroundColor}
    customContainerStyle={customSectionContainerStyle}
    {...{
      isSticky,
      paddingTop,
      paddingBottom,
      flexDirection: 'row',
    }}
  >
    {logoPosition === LogoPosition.Left && renderLogo(logo)}
    {renderNavigation(
      {
        items: links,
        textType: linkTextType,
        linkColor,
        linkActiveStyle,
        linkActiveColor,
        linkHoverStyle,
        linkHoverColor,
        align: 'horizontal',
        customCss: {
          display: getNavDisplayAttr(burgerMenuBreakPoint),
          padding: '0 2rem',
          'flex-grow': '1',
          'justify-content': 'start',
        },
      },
      burgerMenuBreakPoint,
    )}
    {renderCTA(ctaDisplay, ctaText, ctaLink, ctaButtonType)}
    {logoPosition === LogoPosition.Right && renderLogo(logo)}
  </Section>
)

//items={navigationItems} align="horizontal" customCss={}

Header.mapDataToProps = (headerData) => {
  const {
    header: { defaultData: headerDefaults },
  } = PagePort.config

  const {
    burger_menu_breakpoint,
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
    cta_display = false,
    cta_text,
    cta_button_type,
    cta_link,
  } = _.merge(headerDefaults as Partial<HeaderData>, _.omitBy(_.omitBy(headerData, _.isNull), _.isUndefined))

  const props: HeaderProps = {
    burgerMenuBreakPoint: burger_menu_breakpoint,
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

              const { text } = navItem

              return {
                ...linkProps,
                ...{
                  children: text,
                },
              }
            }),
          )
        : undefined,
    ctaDisplay: cta_display,
    ctaText: cta_text,
    ctaLink: DataHelper.prismicLinkToLinkProps(cta_link),
    ctaButtonType: cta_button_type,
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

function getNavDisplayAttr(breakPoint: BreakPointName | 'Never'): string {
  if (breakPoint === BreakPointName.Desktop) {
    return 'none'
  }

  const attributeParts: Array<string> = []

  switch (breakPoint) {
    case BreakPointName.Phone:
      attributeParts.push('none')
    case BreakPointName.Tablet:
      attributeParts.push('none')
    case BreakPointName.Laptop:
      attributeParts.push('none')
  }

  attributeParts.push('flex')
  return attributeParts.join('|')
}

// function getBurgerNavDisplayAttr(breakPoint: BreakPointName | 'Never'): string {
//   if (breakPoint === 'Never') {
//     return 'none'
//   }
//
//   const attributeParts: Array<string> = []
//
//   switch (breakPoint) {
//     case BreakPointName.Laptop:
//       attributeParts.push('none')
//     case BreakPointName.Tablet:
//       attributeParts.push('none')
//     case BreakPointName.Phone:
//       attributeParts.push('none')
//   }
//
//   attributeParts.push('flex')
//   return attributeParts.join('|')
// }

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

function renderNavigation(
  navigationProps: NavigationProps,
  burgerMenuBreakpoint: BreakPointName | 'Never',
): React.ReactFragment | null {
  if (
    !navigationProps?.items ||
    navigationProps.items.length === 0 ||
    burgerMenuBreakpoint === BreakPointName.Desktop
  ) {
    return null
  }
  return <Navigation {...navigationProps} />
}

function renderCTA(
  doDisplay: boolean,
  text?: string,
  link?: LinkProps,
  buttonType?: ThemeButtonType,
): React.ReactFragment | null {
  if (!(doDisplay && text && link && buttonType)) {
    return null
  }

  const StyledCTAContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `

  return (
    <StyledCTAContainer>
      <Button internal={link.internal} url={link.url} type={buttonType}>
        {text}
      </Button>
    </StyledCTAContainer>
  )
}

export const query = graphql`
  fragment PageHeader on PrismicHeader {
    data {
      burger_menu_breakpoint
      background_color
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
        text
        link {
          url
          target
        }
      }
      cta_display
      cta_text
      cta_button_type
      cta_link {
        url
        target
        link_type
      }
      is_sticky
      padding_bottom
      padding_top
    }
  }
`
