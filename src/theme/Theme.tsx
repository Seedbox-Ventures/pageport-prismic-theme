import _ from 'lodash'
import { DefaultTheme } from 'styled-components'
import {
  ThemeButtonConfig,
  ThemeButtonType,
  ThemeColorType,
  ThemeData,
  ThemeFontFamilyType,
  ThemeLinkInteractiveStyle,
  ThemeLinkStyle,
  ThemeProps,
  ThemeTextColor,
  ThemeTextType,
  ThemeTypeStyle,
} from './types'
import { StyleHelper, StyleObject } from './Style'
import { PrismicHelper } from '../utils/Prismic'
import { LinkStyle } from '../modules/basic/Link'
import { createTheme, Palette, PaletteColor, Theme as MUITheme } from '@mui/material'
import { CSSProperties, Typography } from '@mui/material/styles/createTypography'

const tinycolor = require('tinycolor2')

export class Theme implements DefaultTheme {
  readonly props: ThemeProps
  readonly muiTheme: MUITheme

  constructor(themeProps: ThemeProps) {
    this.props = themeProps
    this.muiTheme = createTheme({ palette: this._extractMUIPalette(), typography: this._extractMUITypography })
  }

  static mapDataToProps = (themeData: ThemeData): ThemeProps => {
    return _.omitBy(PrismicHelper.objectKeysToCamelCase(themeData), (val) => {
      return typeof val === 'undefined' || val === null || (typeof val === 'object' && Object.keys(val).length === 0)
    }) as ThemeProps
  }

  private _getMUIPaletteColor = (colorValue: `#${string}`): PaletteColor => {
    const color = tinycolor(colorValue)
    return {
      light: color.lighten().toString(),
      main: colorValue,
      dark: color.darken().toString(),
      contrastText: this.getTextColorValueByBackgroundValue(colorValue),
    }
  }

  private _extractMUIPalette = (): Partial<Palette> => {
    return {
      common: {
        black: this.getColorValueByType(ThemeColorType.DarkText),
        white: this.getColorValueByType(ThemeColorType.LightText),
      },
      primary: this._getMUIPaletteColor(this.getColorValueByType(ThemeColorType.Primary)),
      secondary: this._getMUIPaletteColor(this.getColorValueByType(ThemeColorType.Accent)),
      error: this._getMUIPaletteColor(this.getColorValueByType(ThemeColorType.Danger)),
      warning: this._getMUIPaletteColor(this.getColorValueByType(ThemeColorType.Warn)),
      info: this._getMUIPaletteColor(this.getColorValueByType(ThemeColorType.Info)),
      success: this._getMUIPaletteColor(this.getColorValueByType(ThemeColorType.Success)),
    }
  }

  private _extractMUITypography = (): Partial<Typography> => {
    return {
      fontSize: StyleHelper.toPixelNumber(this.getStandardType().fontSize),
      htmlFontSize: StyleHelper.toPixelNumber(this.getStandardType().fontSize),
      h1: this.getTextTypeStyleObject(ThemeTextType.PageTitle) as unknown as CSSProperties,
      h2: this.getTextTypeStyleObject(ThemeTextType.SectionTitle) as unknown as CSSProperties,
      h3: this.getTextTypeStyleObject(ThemeTextType.SubTitle) as unknown as CSSProperties,
      h4: this.getTextTypeStyleObject(ThemeTextType.SmallTitle) as unknown as CSSProperties,
      subtitle1: this.getTextTypeStyleObject(ThemeTextType.SubTitle) as unknown as CSSProperties,
      subtitle2: this.getTextTypeStyleObject(ThemeTextType.SmallTitle) as unknown as CSSProperties,
      button: this.getTextTypeStyleObject(ThemeTextType.Button) as unknown as CSSProperties,
    }
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

  getType = (textType: ThemeTextType): ThemeTypeStyle => {
    return _.find(this.props.typeDefinitions, { textType }) ?? this.getStandardType()
  }

  getStandardType = (): ThemeTypeStyle => {
    return this.getType(ThemeTextType.StandardText)!
  }

  getTextTypeStyleObject = (themeTextType: ThemeTextType = ThemeTextType.StandardText): StyleObject => {
    const themeType = this.getType(themeTextType)

    if (!themeType) {
      throw `Could not get type definition for text type ${themeTextType}`
    }

    return this.getTypeStyleObject(themeType)
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

  renderTextLinkCss = (textColor: ThemeColorType): string => {
    const { linkStyle } = this.props
    const color = this.getColorValueByType(textColor)
    switch (linkStyle) {
      case ThemeLinkStyle.Underline:
        return `
          color: ${color};
          text-decoration: underline;
          
          &:hover {
            text-decoration: none;
          }
        `
      case ThemeLinkStyle.DarkenLighten:
        const darkenedLightenedColor = StyleHelper.lightenDarken(color, 20)
        return `
          color: ${darkenedLightenedColor};
          text-decoration: none;
          
          &:hover {
            color: ${color}
          }
        `
      default:
        return ''
    }
  }

  renderLinkCss = ({
    color = ThemeColorType.DarkText,
    underline = true,
    activeStyle = ThemeLinkInteractiveStyle.Underline,
    activeColor = ThemeColorType.DarkText,
    hoverStyle = ThemeLinkInteractiveStyle.Underline,
    hoverColor = ThemeColorType.DarkText,
  }: LinkStyle = {}): string => {
    return `
      color: ${this.getColorValueByType(color)};
      text-decoration: ${underline ? 'underline' : 'none'};
      
      &:active, &[aria-current=page] {
        ${this.renderLinkInteractionCSS(underline, activeStyle, activeColor, color)}
      }
      
      &:hover, &:focus {
        ${this.renderLinkInteractionCSS(underline, hoverStyle, hoverColor, color)}
      }
    `
  }

  renderLinkInteractionCSS = (
    isUnderlined: boolean,
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
        return `text-decoration: ${isUnderlined ? 'none' : 'underline'};`
    }
  }

  getButtonConfigByType = (buttonType: ThemeButtonType): ThemeButtonConfig => {
    return _.find(this.props.buttons, { buttonType })!
  }
}
