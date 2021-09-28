import * as React from 'react'
import _ from 'lodash'
import { StyleHelper, StyleObject, ThemeColorType, ThemeLinkInteractiveStyle, ThemeTextType } from '../../theme'
import { Link, LinkProps } from './Link'
import styled from 'styled-components'

interface StyledNavigationProps {
  align?: 'vertical' | 'horizontal'
  itemPadding?: string
  textType?: ThemeTextType
  linkColor?: ThemeColorType
  linkActiveStyle?: ThemeLinkInteractiveStyle
  linkActiveColor?: ThemeColorType
  linkHoverStyle?: ThemeLinkInteractiveStyle
  linkHoverColor?: ThemeColorType
  customCss?: StyleObject
}

export interface NavigationProps extends StyledNavigationProps {
  items: Array<LinkProps>
  onItemClick?: () => void
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
        line-height: 1.5em;
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
  onItemClick,
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
      <ul>{renderNavigationItems(items, onItemClick)}</ul>
    </StyledNavigation>
  )
}

function renderNavigationItems(items: Array<LinkProps>, onItemClick?: () => void): Array<React.ReactElement> {
  return _.map(items, ({ internal, url, children }, index) => {
    return (
      <li key={url + index}>
        <Link internal={internal} url={url} onClick={onItemClick}>
          {children}
        </Link>
      </li>
    )
  })
}
