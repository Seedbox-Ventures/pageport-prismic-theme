import * as React from 'react'
import _ from 'lodash'
import {
  BreakPoint,
  BreakPointName,
  ContainerSpacing,
  SpacingObject,
  StyleHelper,
  ThemeButtonType,
  ThemeColorType,
  ThemeLinkInteractiveStyle,
  ThemeTextType,
} from '../../theme'
import { Section } from './Section'
import { DataComponent } from './types'
import { getImage, ImageDataLike } from 'gatsby-plugin-image'
import { DataHelper, PrismicLinkData } from '../../utils/Prismic'
import { LinkProps, LinkStyle } from '../basic/Link'
import { Logo, LogoProps } from '../basic/Logo'
import PagePort from '../../utils/PagePort'
import { Navigation, NavigationProps } from '../basic/Navigation'
import styled from 'styled-components'
import { Button } from '../basic/Button'
import { BurgerMenu, BurgerMenuProps } from '../burgerMenu/BurgerMenu'
import { graphql } from 'gatsby'

export enum Orientation {
  Left = 'Left',
  Right = 'Right',
}

interface LogoData {
  gatsbyImageData?: ImageDataLike
  alt?: string
}

export interface HeaderData {
  background_color: ThemeColorType
  burger_menu_breakpoint: BreakPointName | 'Never'
  logo_position: boolean
  logo_width: string
  logo_link?: PrismicLinkData
  logo: LogoData
  link_text_type: ThemeTextType
  link_color: ThemeColorType
  link_underline: boolean
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
  logoPosition?: Orientation
  logo?: LogoProps
  menuBreakPoint?: BreakPoint
  isSticky?: boolean
  padding?: Partial<ContainerSpacing>
  links?: Array<LinkProps>
  linkTextType: ThemeTextType
  linkStyle: LinkStyle
  ctaDisplay: boolean
  ctaText?: string
  ctaButtonType?: ThemeButtonType
  ctaLink?: LinkProps
}

const customSectionContainerStyle = { 'flex-direction': 'row', 'justify-content': 'space-between' }

export const Header: DataComponent<HeaderProps, HeaderData> = ({
  burgerMenuBreakPoint = 'Never',
  backgroundColor = ThemeColorType.Primary,
  isSticky = false,
  padding,
  logo,
  logoPosition = Orientation.Left,
  links = [],
  linkTextType,
  linkStyle,
  ctaDisplay,
  ctaText,
  ctaButtonType,
  ctaLink,
}) => {
  const navigationPropsPartial = {
    items: links,
    textType: linkTextType,
    linkStyle,
  }
  const { color: linkColor } = linkStyle

  const burgerMenuProps = {
    links,
    textType: linkTextType,
    linkStyle,
    iconColor: linkColor,
    overlayPadding: padding,
    overlayBackgroundColor: backgroundColor,
    orientation: logoPosition,
  }

  return (
    <Section
      as="header"
      backgroundColor={backgroundColor}
      customContainerStyle={customSectionContainerStyle}
      {...{
        isSticky,
        padding,
        flexDirection: 'row',
      }}
    >
      {logoPosition === Orientation.Right && renderBurgerMenu(burgerMenuProps, burgerMenuBreakPoint, logo)}
      {logoPosition === Orientation.Left && <Logo {...logo} />}
      {renderNavigation(
        {
          align: 'horizontal',
          customCss: {
            display: getNavDisplayAttr(burgerMenuBreakPoint),
            padding: '0 2rem',
            'flex-grow': '1',
            'justify-content': 'start',
          },
          ...navigationPropsPartial,
        },
        burgerMenuBreakPoint,
      )}
      {renderCTA(ctaDisplay, ctaText, ctaLink, ctaButtonType, burgerMenuBreakPoint)}
      {logoPosition === Orientation.Left && renderBurgerMenu(burgerMenuProps, burgerMenuBreakPoint, logo)}
      {logoPosition === Orientation.Right && <Logo {...logo} />}
    </Section>
  )
}

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
    link_underline = false,
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

  return {
    burgerMenuBreakPoint: burger_menu_breakpoint,
    backgroundColor: background_color,
    logoPosition: logo_position === true ? Orientation.Right : Orientation.Left,
    padding: { top: padding_top ?? '1rem', bottom: padding_bottom ?? '1rem' },
    isSticky: is_sticky,
    linkTextType: link_text_type,
    linkStyle: {
      underline: link_underline,
      color: link_color,
      activeStyle: link_active_style,
      activeColor: link_active_color,
      hoverStyle: link_hover_style,
      hoverColor: link_hover_color,
    },
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
    logo: mapLogoDataToProps(logo, logo_width, logo_link),
  }
}

function mapLogoDataToProps(logo?: LogoData, width?: string, link?: PrismicLinkData): LogoProps | undefined {
  if (!logo) {
    return undefined
  }
  return {
    image: getImage(logo!.gatsbyImageData!),
    alt: logo!.alt ?? '',
    width,
    link: link ? DataHelper.prismicLinkToLinkProps(link) : undefined,
  }
}

function getNavDisplayAttr(breakPoint: BreakPointName | 'Never'): string {
  if (breakPoint === BreakPointName.Desktop) {
    return 'none'
  }

  const attributeParts: Array<string> = []

  // noinspection FallThroughInSwitchStatementJS
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

const StyledCTAContainer = styled.div<{ breakPoint: BreakPointName | 'Never' }>(({ breakPoint }) =>
  StyleHelper.renderCssFromObject({
    display: getNavDisplayAttr(breakPoint),
    'flex-direction': 'column',
    'justify-content': 'center',
  }),
)

function renderCTA(
  doDisplay: boolean,
  text?: string,
  link?: LinkProps,
  buttonType?: ThemeButtonType,
  breakPoint: BreakPointName | 'Never' = 'Never',
): React.ReactFragment | null {
  if (!(doDisplay && text && link && buttonType)) {
    return null
  }

  return (
    <StyledCTAContainer breakPoint={breakPoint}>
      <Button internal={link.internal} url={link.url} type={buttonType}>
        {text}
      </Button>
    </StyledCTAContainer>
  )
}

const StyledBurgerNavContainer = styled.div<{ displayAttributeParts: Array<string> }>(({ displayAttributeParts }) =>
  StyleHelper.renderCssFromObject({
    display: displayAttributeParts.join('|'),
    'flex-direction': 'column',
    'justify-content': 'center',
  }),
)

const StyledLogoContainer = styled.div<{ position: Partial<SpacingObject> }>(({ position }) => {
  return StyleHelper.renderCssFromObject({
    position: 'absolute',
    top: position.top,
    right: position.right,
    bottom: position.bottom,
    left: position.left,
  })
})

function renderBurgerMenu(
  burgerMenuProps: BurgerMenuProps,
  breakPoint: BreakPointName | 'Never',
  overlayLogo?: LogoProps,
): React.ReactFragment | null {
  const { links, orientation, overlayPadding } = burgerMenuProps
  if (!links || links.length === 0 || breakPoint === 'Never') {
    return null
  }

  const displayAttributeParts: Array<string> = []
  const paddingObj = StyleHelper.spacingToObject(overlayPadding) ?? StyleHelper.spacingStringToObject('1rem')

  if (breakPoint === BreakPointName.Desktop) {
    displayAttributeParts.push('flex')
  } else {
    // noinspection FallThroughInSwitchStatementJS
    switch (breakPoint) {
      case BreakPointName.Laptop:
        displayAttributeParts.push('flex')
      case BreakPointName.Tablet:
        displayAttributeParts.push('flex')
      case BreakPointName.Phone:
        displayAttributeParts.push('flex')
    }

    displayAttributeParts.push('none')
  }

  return (
    <StyledBurgerNavContainer displayAttributeParts={displayAttributeParts}>
      <BurgerMenu {...burgerMenuProps}>
        {overlayLogo && (
          <StyledLogoContainer
            position={{
              top: paddingObj.top,
              left: orientation === Orientation.Left ? paddingObj.left : undefined,
              right: orientation === Orientation.Right ? paddingObj.right : undefined,
            }}
          >
            <Logo {...overlayLogo} />
          </StyledLogoContainer>
        )}
      </BurgerMenu>
    </StyledBurgerNavContainer>
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
      link_underline
      link_active_color
      link_active_style
      link_hover_color
      link_hover_style
      links {
        text
        link {
          url
          target
          link_type
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
