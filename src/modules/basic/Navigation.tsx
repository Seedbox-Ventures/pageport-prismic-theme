import * as React from 'react'
import _ from 'lodash'
import { StyleHelper, StyleObject, ThemeTextType } from '../../theme'
import Link, { LinkProps, LinkStyle } from './Link'
import styled from 'styled-components'

interface StyledNavigationProps {
  align?: 'vertical' | 'horizontal'
  itemPadding?: string
  textType?: ThemeTextType
  customCss?: StyleObject
  linkStyle?: LinkStyle
}

export interface NavigationProps extends StyledNavigationProps {
  items: Array<LinkProps>
  onItemClick?: () => void
}

export const StyledNavigation = styled.nav<StyledNavigationProps>(
  ({ align = 'vertical', itemPadding = '0 1rem', customCss = {}, linkStyle, textType, theme }) => {
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
        ${theme.renderLinkCss(linkStyle)}
        ${StyleHelper.renderCssFromObject({ padding: itemPadding })}
      }
      
      ul {
        display: flex;
        flex-direction: ${align === 'vertical' ? 'column' : 'row'};
      }
    `
  },
)

const Navigation: React.FC<NavigationProps> = ({
  items,
  align,
  customCss,
  linkStyle,
  textType,
  onItemClick,
}: NavigationProps) => {
  return (
    <StyledNavigation
      {...{
        align,
        textType,
        linkStyle,
        customCss,
      }}
    >
      <ul>{renderNavigationItems(items, onItemClick)}</ul>
    </StyledNavigation>
  )
}

export default Navigation

function renderNavigationItems(items: Array<LinkProps>, onItemClick?: () => void): Array<React.ReactElement> {
  return _.map(items, ({ internal, url, children }, index) => {
    return (
      <li key={index}>
        <Link internal={internal} url={url} onClick={onItemClick}>
          {children}
        </Link>
      </li>
    )
  })
}
