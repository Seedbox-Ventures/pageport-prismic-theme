import * as React from 'react'
import styled from 'styled-components'
import { ThemeButtonType, ThemeTextType } from '../theme/types'
import { Link } from 'gatsby'
import { linkResolver } from '../utils/LinkResolver'
import { PrismicLinkType, PrismicLinkTypeEnum } from '../types/PrismicLink'

export interface ButtonProps {
  text: string
  type: ThemeButtonType
  link: PrismicLinkType
}

const StyledButton = styled.div<{ buttonType: ThemeButtonType }>(({
  buttonType,
  theme,
}) => {
  const buttonConfig = theme.getButtonConfigByType(buttonType)
  const buttonColorValue = theme.getColorValueByType(buttonConfig.color)

  const values = {
    padding: theme.values.buttonPadding,
    borderRadius: theme.values.buttonBorderRadius,
    border: {
      width: theme.values.buttonBorderWidth,
      color: buttonColorValue,
    },
    boxShadow: theme.values.buttonBoxShadow || 'none',
    fontFamily: theme.getFontFamily((theme.getType(ThemeTextType.Button) || theme.getStandardType()).fontFamily),
    bgColor: !(buttonConfig.fillBackground) ? 'transparent' : buttonColorValue,
    textColor: !(buttonConfig.fillBackground) ? buttonColorValue : theme.getTextColorValueByBackgroundValue(buttonColorValue),
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
  `
})

export const Button: React.FC<ButtonProps> =
  ({
    text,
    type,
    link
   }) => {
    if (link.link_type === PrismicLinkTypeEnum.Document) {
      return (
        <StyledButton as={Link} buttonType={type} to={linkResolver(link)} key={link.id}>
          {text}
        </StyledButton>
      )
    }

    if (link.link_type === PrismicLinkTypeEnum.Web) {
      return (
        <StyledButton as="a" buttonType={type} id={link.id} href={link.url}>
          {text}
        </StyledButton>
      )
    }
    return null
  }
