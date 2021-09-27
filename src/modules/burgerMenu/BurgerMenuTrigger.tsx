import React, { MouseEventHandler } from 'react'
import { StyleHelper, StyleObject, ThemeColorType } from '../../theme'
import styled from 'styled-components'
import _ from 'lodash'

export interface StyledBurgerMenuTriggerProps {
  customCss?: StyleObject
  iconColor?: ThemeColorType
  animate?: boolean
}

export interface BurgerMenuTriggerProps extends StyledBurgerMenuTriggerProps {
  isOpen: boolean
  onClick: MouseEventHandler | undefined
}

const StyledBurgerMenuTrigger = styled.button<StyledBurgerMenuTriggerProps>(
  ({ animate = false, customCss = {}, iconColor = ThemeColorType.DarkText, theme }) => {
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
    ${animate ? 'transition: 0.25s ease-in-out;' : ''}
    
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

export const BurgerMenuTrigger: React.FC<BurgerMenuTriggerProps> = ({
  isOpen = false,
  onClick,
  iconColor,
  customCss,
}) => (
  <StyledBurgerMenuTrigger
    className={isOpen ? 'open' : ''}
    onClick={onClick}
    iconColor={iconColor}
    customCss={customCss}
  >
    <span />
    <span />
    <span />
    <span />
  </StyledBurgerMenuTrigger>
)
