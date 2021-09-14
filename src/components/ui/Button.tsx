import * as React from 'react'
import styled from 'styled-components'
import { ThemeButtonHoverEffectType, ThemeButtonType, ThemeTextType } from '../../theme'
import tinycolor from 'tinycolor2'
import { Link, LinkProps } from './Link'

export interface ButtonProps extends LinkProps {
  type: ThemeButtonType
}

const StyledButton = styled.div<{ buttonType: ThemeButtonType }>(({
                                                                    buttonType,
                                                                    theme,
                                                                  }) => {
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
    bgColor: !(buttonConfig.fillBackground) ? 'transparent' : buttonColorValue,
    textColor: !(buttonConfig.fillBackground) ? buttonColorValue : theme.getTextColorValueByBackgroundValue(buttonColorValue),
  }

  const lightenDarken = (colorValue: `#${string}`, amount = 10): `${string}` => `${(tinycolor(colorValue).isDark() ? tinycolor(colorValue).brighten(amount) : tinycolor(colorValue).darken(amount)).toHexString()}`

  const buttonHoverEffects: Record<ThemeButtonHoverEffectType, any> = {
    [ThemeButtonHoverEffectType.None]: `
      
    `,
    [ThemeButtonHoverEffectType.ChangeBackground]: `
      background-color: ${!(buttonConfig.fillBackground) ? buttonColorValue : 'transparent'};
      color: ${!(buttonConfig.fillBackground) ? theme.getTextColorValueByBackgroundValue(buttonColorValue) : buttonColorValue};
    `,
    [ThemeButtonHoverEffectType.ChangeBoxShadow]: `
      /* TODO: implement ChangeBoxShadow effect */
    `,
    [ThemeButtonHoverEffectType.DarkenLighten]: `
      background-color: ${lightenDarken(buttonColorValue)};
      border-color: ${lightenDarken(buttonColorValue)};
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
    
    &:hover, &:focus {
      ${buttonHoverEffects[buttonConfig.hoverEffect]}
    }
  `
})

export const Button: React.FC<ButtonProps> =
  ({ type, url, target, internal, children }) => {
    return (
      <StyledButton as={Link} buttonType={type} url={url} target={target} internal={internal}>
        {children}
      </StyledButton>
    )
  }
