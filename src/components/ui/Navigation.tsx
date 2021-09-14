import * as React from 'react'
import _ from 'lodash'
import { ThemeButtonType, ThemeTextType } from '../../theme'
import { Link, LinkProps } from './Link'
import { Button } from './Button'
import styled from 'styled-components'

export type NavItemType = ThemeButtonType | 'Link'

export interface NavigationItemProps extends LinkProps {
  type: NavItemType
}

export interface NavigationProps {
  items: Array<NavigationItemProps>
  textType?: ThemeTextType
}

const StyledNavigation = styled.nav<{ textType: ThemeTextType }>(({ textType, theme }) => {
  return theme.renderTextTypeCss(textType)
})

export const Navigation: React.FC<NavigationProps> = (
  {
    items,
    textType = ThemeTextType.StandardText,
  }: NavigationProps) => {
  return <StyledNavigation textType={textType}>
    {renderNavigationItems(items)}
  </StyledNavigation>
}

function renderNavigationItems(items: Array<NavigationItemProps>): Array<React.ReactElement> {
  return _.map(items, ({ internal, url, children, type }) => {
    if (type === 'Link') {
      return <Link internal={internal} url={url}>{children}</Link>
    }
    return <Button type={type} internal={internal} url={url}>{children}</Button>
  })
}
