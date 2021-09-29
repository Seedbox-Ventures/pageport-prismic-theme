import * as React from 'react'
import styled from 'styled-components'
import { StyleHelper, ThemeButtonHoverEffectType, ThemeButtonType, ThemeTextType } from '../../theme'
import { Link } from 'gatsby'
import { LinkProps } from './Link'

const StyledButton = styled.button<{ buttonType: ThemeButtonType; as: React.ElementType }>(({ buttonType, theme }) => {
  const buttonConfig = theme.getButtonConfigByType(buttonType)
  const buttonColorValue = theme.getColorValueByType(buttonConfig.color)

  const values = {
    padding: theme.props.buttonPadding,
    borderRadius: theme.props.buttonBorderRadius,
    border: {
      width: theme.props.buttonBorderWidth,
      color: buttonColorValue,
    },
    boxShadow: theme.props.buttonBoxShadow,
    fontFamily: theme.getFontFamily((theme.getType(ThemeTextType.Button) || theme.getStandardType()).fontFamily),
    bgColor: !buttonConfig.fillBackground ? 'transparent' : buttonColorValue,
    textColor: !buttonConfig.fillBackground
      ? buttonColorValue
      : theme.getTextColorValueByBackgroundValue(buttonColorValue),
  }

  const buttonHoverEffects: Record<ThemeButtonHoverEffectType, string> = {
    [ThemeButtonHoverEffectType.None]: `
      
    `,
    [ThemeButtonHoverEffectType.ChangeBackground]: `
      background-color: ${!buttonConfig.fillBackground ? buttonColorValue : 'transparent'};
      color: ${
        !buttonConfig.fillBackground ? theme.getTextColorValueByBackgroundValue(buttonColorValue) : buttonColorValue
      };
    `,
    [ThemeButtonHoverEffectType.ChangeBoxShadow]: `
      /* TODO: implement ChangeBoxShadow effect */
    `,
    [ThemeButtonHoverEffectType.DarkenLighten]: `
      background-color: ${StyleHelper.lightenDarken(buttonColorValue)};
      border-color: ${StyleHelper.lightenDarken(buttonColorValue)};
    `,
  }

  return `
    display: inline-block;
    margin: 0;
    padding: ${values.padding};
    border: ${values.border.width} solid ${values.border.color};
    border-radius: ${values.borderRadius};
    background-color: ${values.bgColor};
    box-sizing: border-box;
    text-decoration: none;
    font-family: ${values.fontFamily};
    color: ${values.textColor};
    text-align: center;
    transition: all 0.2s;
    line-height: 1;
    cursor: pointer;
    
    &:hover, &:focus {
      ${buttonHoverEffects[buttonConfig.hoverEffect]}
    }
  `
})

export interface ButtonProps {
  type: ThemeButtonType
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const Button: React.FC<ButtonProps> = ({ type, children, onClick }) => {
  return (
    <StyledButton buttonType={type} as={'button'} onClick={onClick}>
      {children}
    </StyledButton>
  )
}

export interface ButtonLinkProps extends LinkProps {
  type?: ThemeButtonType
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  type = ThemeButtonType.Default,
  url,
  target,
  internal,
  children,
}) => {
  if (internal) {
    return (
      <StyledButton as={Link} to={url} target={target} buttonType={type}>
        {children}
      </StyledButton>
    )
  }
  return (
    <StyledButton as="a" href={url} target={target} buttonType={type}>
      {children}
    </StyledButton>
  )
}
