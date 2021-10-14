import React, { useContext } from 'react'
import { StyleHelper, ThemeButtonHoverEffectType, ThemeButtonType, ThemeTextType } from '../../theme'
import { Button as MUIButton, ButtonProps as MUIButtonProps } from '@mui/material'
import styled, { ThemeContext } from 'styled-components'
import { BasicLinkProps } from './Link'

const buttonShadow =
  '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)'
const buttonHoverShadow =
  '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)'

export interface ButtonProps extends BasicLinkProps {
  disabled?: boolean
  themeType?: ThemeButtonType
  type?: 'button' | 'submit' | 'reset'
}

interface StyledButtonProps extends MUIButtonProps {
  colorValue: `#${string}`
  hoverEffect: ThemeButtonHoverEffectType
  shadow: boolean
}

const StyledButton = styled(MUIButton)<StyledButtonProps>(({ colorValue, hoverEffect, shadow, theme }) => {
  const textColor = theme.getTextColorValueByBackgroundValue(colorValue)
  const ghostColor = '#aaa'
  const ghostTextColor = '#ccc'

  return {
    '&.MuiButton-root': {
      '&': {
        fontFamily: theme.getFontFamily((theme.getType(ThemeTextType.Button) || theme.getStandardType()).fontFamily),
      },
      '&.Mui-disabled': {
        cursor: 'not-allowed',
      },
      '&.MuiButton-contained': {
        '&': {
          background: colorValue,
          color: textColor,
          borderColor: colorValue,
          padding: theme.props.buttonPadding,
          borderRadius: theme.props.buttonBorderRadius,
          borderWidth: theme.props.buttonBorderWidth,
          borderStyle: 'solid',
          boxShadow: shadow ? buttonShadow : 'none',
        },
        '&:hover, &:focus': getButtonHoverStyle('contained', hoverEffect, colorValue),
        '&.Mui-disabled': {
          backgroundColor: ghostColor,
          borderColor: ghostColor,
          color: ghostTextColor,
        },
      },
      '&.MuiButton-outlined': {
        '&': {
          color: colorValue,
          borderColor: colorValue,
          padding: theme.props.buttonPadding,
          borderRadius: theme.props.buttonBorderRadius,
          borderWidth: theme.props.buttonBorderWidth,
          boxShadow: shadow ? buttonShadow : 'none',
        },
        '&:hover, &:focus': getButtonHoverStyle('outlined', hoverEffect, colorValue),
        '&.Mui-disabled': {
          borderColor: ghostColor,
          color: ghostTextColor,
        },
      },
      '&.MuiButton-text': {
        '&': {
          color: colorValue,
        },
        '&:hover, &:focus': getButtonHoverStyle('text', hoverEffect, colorValue),
      },
    },
  }
})

const Button: React.FC<ButtonProps> = ({ disabled, themeType = ThemeButtonType.Default, type, url, children,onClick }) => {
  const buttonProps: StyledButtonProps = {
    ...getStyledButtonPropsFromButtonType(themeType),
    href: url,
    disabled,
    type,
    onClick
  }

  return (
    <StyledButton
      {...buttonProps}
    >
      {children}
    </StyledButton>
  )
}

export default Button

function getStyledButtonPropsFromButtonType(type: ThemeButtonType): StyledButtonProps {
  const theme = useContext(ThemeContext)
  const { buttonBoxShadow } = theme.props
  const { fillBackground, color, hoverEffect } = theme.getButtonConfigByType(type)
  const buttonColorValue = theme.getColorValueByType(color)

  return {
    variant: fillBackground ? 'contained' : 'outlined',
    colorValue: buttonColorValue,
    hoverEffect,
    shadow: buttonBoxShadow,
  }
}

function getButtonHoverStyle(
  variant: 'contained' | 'outlined' | 'text',
  hoverType: ThemeButtonHoverEffectType,
  baseColorValue: `#${string}`,
) {
  const theme = useContext(ThemeContext)
  const changeColor = StyleHelper.lightenDarken(baseColorValue, 20)
  const changeTextColor = theme.getTextColorValueByBackgroundValue(baseColorValue)

  const hoverStyles: Record<'contained' | 'outlined' | 'text', Record<ThemeButtonHoverEffectType, any>> = {
    contained: {
      [ThemeButtonHoverEffectType.None]: {},
      [ThemeButtonHoverEffectType.ChangeBackground]: {
        background: 'transparent',
        color: baseColorValue,
      },
      [ThemeButtonHoverEffectType.ChangeBoxShadow]: {
        boxShadow: buttonHoverShadow,
      },
      [ThemeButtonHoverEffectType.DarkenLighten]: {
        background: changeColor,
        borderColor: changeColor,
      },
    },
    outlined: {
      [ThemeButtonHoverEffectType.None]: {},
      [ThemeButtonHoverEffectType.ChangeBackground]: {
        backgroundColor: baseColorValue,
        color: changeTextColor,
      },
      [ThemeButtonHoverEffectType.ChangeBoxShadow]: {
        boxShadow: buttonHoverShadow,
      },
      [ThemeButtonHoverEffectType.DarkenLighten]: {
        borderColor: changeColor,
        color: changeColor,
      },
    },
    text: {
      [ThemeButtonHoverEffectType.None]: {},
      [ThemeButtonHoverEffectType.ChangeBackground]: {
        backgroundColor: baseColorValue,
        color: changeTextColor,
      },
      [ThemeButtonHoverEffectType.ChangeBoxShadow]: {},
      [ThemeButtonHoverEffectType.DarkenLighten]: {
        color: changeColor,
      },
    },
  }

  return hoverStyles[variant][hoverType]
}
