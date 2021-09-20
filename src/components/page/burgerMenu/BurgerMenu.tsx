import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { StyleHelper, ThemeColorType } from '../../../theme'
import { LinkProps } from '../../basic/Link'
import { useAppDispatch, useAppSelector } from '../../../state/hooks'
import { selectIsOpen, toggleMenu } from './burgerMenuSlice'

interface StyledBurgerMenuProps {
  customCss?: Record<string, string>
  iconColor?: ThemeColorType
}

const StyledBurgerMenu = styled.button<StyledBurgerMenuProps>(
  ({ customCss = {}, iconColor = ThemeColorType.DarkText, theme }) => {
    return `
  ${StyleHelper.renderCssFromObject(
    _.merge(
      {},
      {
        padding: '.5em',
        'font-size': '12px|16px',
        width: '3em',
        height: '3em',
        position: 'relative',
        transform: 'rotate(0deg)',
        transition: '.5s ease-in-out',
        cursor: 'pointer',
        background: 'transparent',
        border: 'none',
      },
      customCss,
    ),
  )}
  
  span {
    display: block;
    position  : absolute;
    height: .25em;
    width: 2em;
    background: ${theme.getColorValueByType(iconColor)};
    border-radius: .25em;
    left: .5em;
    transition: 0.25s ease-in-out;
    
    &:nth-child(1) {
      top: .5em;
    }
    
    &:nth-child(2), &:nth-child(3) {
      top: calc(50% - .125em);
    }
    
    &:nth-child(4) {
      bottom: .5em;
    }
  }
  
  &.open span{
    &:nth-child(1) {
      top: 18px;
      width: 0%;
      left: 50%;
    }

    &:nth-child(2) {
      transform: rotate(45deg);
    }

    &:nth-child(3) {
      transform: rotate(-45deg);
    }

    &:nth-child(4) {
      top: 18px;
      width: 0%;
      left: 50%;
    }
  }
`
  },
)

export interface BurgerMenuProps extends StyledBurgerMenuProps {
  links: Array<LinkProps>
}

export const BurgerMenu: React.FC<BurgerMenuProps> = function ({ customCss, iconColor }) {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(selectIsOpen)

  return (
    <StyledBurgerMenu
      className={isOpen ? 'open' : ''}
      customCss={customCss}
      iconColor={iconColor}
      onClick={() => dispatch(toggleMenu())}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </StyledBurgerMenu>
  )
}
