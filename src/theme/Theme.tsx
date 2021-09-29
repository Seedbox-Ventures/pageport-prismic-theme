import _ from 'lodash'
import { DefaultTheme } from 'styled-components'
import {
  ThemeButtonConfig,
  ThemeButtonType,
  ThemeColorType,
  ThemeData,
  ThemeFontFamilyType,
  ThemeLinkInteractiveStyle,
  ThemeProps,
  ThemeTextColor,
  ThemeTextType,
  ThemeTypeStyle,
} from './types'
import { StyleHelper, StyleObject } from './Style'
import { DataHelper } from '../utils/Prismic'

const tinycolor = require('tinycolor2')

export class Theme implements DefaultTheme {
  readonly props: ThemeProps

  constructor(themeProps: ThemeProps) {
    this.props = themeProps
  }

  static mapDataToProps = (themeData: ThemeData): ThemeProps => {
    return _.omitBy(DataHelper.objectKeysToCamelCase(themeData), _.isEmpty) as ThemeProps
  }

  getColorValueByType = (colorType: ThemeColorType): `#${string}` => {
    try {
      return _.find(this.props.colors, { colorType })!.value
    } catch (e) {
      throw `Cannot get color value for color type ${colorType}. `
    }
  }

  getFontFamily = (fontFamilyType: ThemeFontFamilyType): string => {
    return fontFamilyType === ThemeFontFamilyType.Secondary
      ? this.props.secondaryFontFamily
      : this.props.primaryFontFamily
  }

  getTextColorValueByBackground = (background: ThemeColorType): `#${string}` => {
    const backgroundColorValue: `#${string}` = this.getColorValueByType(background)
    return this.getTextColorValueByBackgroundValue(backgroundColorValue)
  }

  getTextColorByBackground = (background: ThemeColorType): ThemeColorType => {
    const backgroundColorValue: `#${string}` = this.getColorValueByType(background)
    return this.getTextColorByBackgroundValue(backgroundColorValue)
  }

  getTextColorByBackgroundValue = (background: `#${string}`): ThemeTextColor => {
    return tinycolor(background).isDark() ? ThemeColorType.LightText : ThemeColorType.DarkText
  }

  getTextColorValueByBackgroundValue = (background: `#${string}`): `#${string}` => {
    const textColor: ThemeTextColor = this.getTextColorByBackgroundValue(background)
    return this.getColorValueByType(textColor)
  }

  getType = (textType: ThemeTextType): ThemeTypeStyle | undefined => {
    return _.find(this.props.typeDefinitions, { textType })
  }

  getStandardType = (): ThemeTypeStyle => {
    return this.getType(ThemeTextType.StandardText)!
  }

  getTextTypeStyleObject = (themeTextType: ThemeTextType = ThemeTextType.StandardText): StyleObject => {
    const themeType = this.getType(themeTextType)

    if (!themeType) {
      throw `Could not get type definition for text type ${themeTextType}`
    }

    return this.getTextTypeStyleObject(themeTextType)
  }

  getTypeStyleObject = (themeType: ThemeTypeStyle): StyleObject => {
    return {
      'font-family': this.getFontFamily(themeType.fontFamily),
      'font-size': themeType.fontSize,
      'letter-spacing': themeType.letterSpacing,
      'line-height': themeType.lineHeight,
      'font-weight': themeType.fontWeight,
      'font-style': themeType.fontStyle,
    }
  }

  renderTextTypeCss = (themeTextType: ThemeTextType = ThemeTextType.StandardText): string => {
    const themeType = this.getType(themeTextType)

    if (!themeType) {
      throw `Could not get type definition for text type ${themeTextType}`
    }

    return this.renderTypeCss(themeType)
  }

  renderTypeCss = (themeType: ThemeTypeStyle): string => {
    return StyleHelper.renderCssFromObject(this.getTypeStyleObject(themeType))
  }

  renderLinkCss = (
    linkColor: ThemeColorType = ThemeColorType.DarkText,
    linkActiveStyle: ThemeLinkInteractiveStyle = ThemeLinkInteractiveStyle.ChangeColor,
    linkActiveColor: ThemeColorType = ThemeColorType.Accent,
    linkHoverStyle: ThemeLinkInteractiveStyle = ThemeLinkInteractiveStyle.ChangeColor,
    linkHoverColor: ThemeColorType = ThemeColorType.Accent,
  ): string => {
    return `
      color: ${this.getColorValueByType(linkColor)};
      
      &:active, &[aria-current=page] {
        ${this.renderLinkInteractionCSS(linkActiveStyle, linkActiveColor, linkColor)}
      }
      
      &:hover, &:focus {
        ${this.renderLinkInteractionCSS(linkHoverStyle, linkHoverColor, linkColor)}
      }
    `
  }

  renderLinkInteractionCSS = (
    linkInteractionStyle: ThemeLinkInteractiveStyle,
    linkInteractionColor: ThemeColorType,
    linkBaseColor: ThemeColorType,
  ): string => {
    switch (linkInteractionStyle) {
      case ThemeLinkInteractiveStyle.None:
        return ''
      case ThemeLinkInteractiveStyle.ChangeColor:
        return `color: ${this.getColorValueByType(linkInteractionColor)};`
      case ThemeLinkInteractiveStyle.DarkenLighten:
        return `color: ${StyleHelper.lightenDarken(this.getColorValueByType(linkBaseColor), 20)};`
      case ThemeLinkInteractiveStyle.Underline:
      default:
        return `text-decoration: underline;`
    }
  }

  getButtonConfigByType = (buttonType: ThemeButtonType): ThemeButtonConfig => {
    return _.find(this.props.buttons, { buttonType })!
  }
}
