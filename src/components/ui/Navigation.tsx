import * as React from 'react'
import _ from 'lodash'
import { StyleHelper, ThemeButtonType, ThemeColorType, ThemeLinkInteractiveStyle, ThemeTextType } from '../../theme'
import { Link, LinkProps } from './Link'
import { Button } from './Button'
import styled from 'styled-components'

export type NavItemType = ThemeButtonType | 'Link'

export interface NavigationItemProps extends LinkProps {
  type: NavItemType
}

interface StyledNavigationProps {
  align?: 'vertical' | 'horizontal'
  itemPadding?: string
  textType?: ThemeTextType
  linkColor?: ThemeColorType
  linkActiveStyle?: ThemeLinkInteractiveStyle
  linkActiveColor?: ThemeColorType
  linkHoverStyle?: ThemeLinkInteractiveStyle
  linkHoverColor?: ThemeColorType
  customCss?: Record<string, string>
}

export interface NavigationProps extends StyledNavigationProps {
  items: Array<NavigationItemProps>
}

export const StyledNavigation = styled.nav<StyledNavigationProps>(
  ({
    textType,
    linkColor,
    linkActiveStyle,
    linkActiveColor,
    linkHoverStyle,
    linkHoverColor,
    align = 'vertical',
    itemPadding = '0 1rem',
    customCss = {},
    theme,
  }) => {
    return `
      ${StyleHelper.renderCssFromObject(
        _.merge(
          {
            display: 'flex',
            'justify-content': 'center',
            'align-items': 'center',
          },
          customCss,
        ),
      )}
      ${theme.renderTextTypeCss(textType)}
      a {
        display: inline-block;
        ${theme.renderLinkCss(linkColor, linkActiveStyle, linkActiveColor, linkHoverStyle, linkHoverColor)}
        ${StyleHelper.renderCssFromObject({ padding: itemPadding })}
      }
      
      ul {
        display: flex;
        flex-direction: ${align === 'vertical' ? 'column' : 'row'};
      }
    `
  },
)

export const Navigation: React.FC<NavigationProps> = ({
  items,
  align,
  customCss,
  linkColor,
  linkActiveColor,
  linkActiveStyle,
  linkHoverColor,
  linkHoverStyle,
  textType,
}: NavigationProps) => {
  return (
    <StyledNavigation
      {...{
        align,
        textType,
        linkColor,
        linkActiveStyle,
        linkActiveColor,
        linkHoverStyle,
        linkHoverColor,
        customCss,
      }}
    >
      <ul>{renderNavigationItems(items)}</ul>
    </StyledNavigation>
  )
}

function renderNavigationItems(items: Array<NavigationItemProps>): Array<React.ReactElement> {
  return _.map(items, ({ internal, url, children, type }, index) => {
    if (type === 'Link') {
      return (
        <li key={url + index}>
          <Link internal={internal} url={url}>
            {children}
          </Link>
        </li>
      )
    }
    return (
      <li>
        <Button type={type} internal={internal} url={url}>
          {children}
        </Button>
      </li>
    )
  })
}
