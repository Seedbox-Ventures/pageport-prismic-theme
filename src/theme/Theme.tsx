import _ from 'lodash'
import { DefaultTheme } from 'styled-components'
import {
  ThemeButtonConfig,
  ThemeButtonType,
  ThemeColorType,
  ThemeData,
  ThemeFontFamilyType,
  ThemeProps,
  ThemeTextColor,
  ThemeTextType,
  ThemeType,
} from './types'
import { StyleHelper } from './Style'
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
    return (_.find(this.props.colors, { colorType })!).value
  }

  getFontFamily = (fontFamilyType: ThemeFontFamilyType): string => {
    return fontFamilyType === ThemeFontFamilyType.Secondary ? this.props.secondaryFontFamily : this.props.primaryFontFamily
  }

  getTextColorValueByBackground = (background: ThemeColorType): `#${string}` => {
    const backgroundColorValue: `#${string}` = this.getColorValueByType(background)
    return this.getTextColorValueByBackgroundValue(backgroundColorValue)
  }

  getTextColorValueByBackgroundValue = (background: `#${string}`): `#${string}` => {
    const textColor: ThemeTextColor = tinycolor(background).isDark() ? ThemeColorType.LightText : ThemeColorType.DarkText
    return this.getColorValueByType(textColor)
  }

  getType = (textType: ThemeTextType): ThemeType | undefined => {
    return _.find(this.props.typeDefinitions, { textType })
  }

  getStandardType = (): ThemeType => {
    return this.getType(ThemeTextType.StandardText)!
  }

  renderTextTypeCss = (themeTextType: ThemeTextType): string => {
    const themeType = this.getType(themeTextType)

    if (!themeType) {
      return ''
    }

    return this.renderTypeCss(themeType)
  }

  renderTypeCss = (themeType: ThemeType): string => {
    return StyleHelper.renderCssFromObject({
      'font-size': themeType.fontSize,
      'line-height': themeType.lineHeight,
      'font-family': this.getFontFamily(themeType.fontFamily),
    })
  }

  getButtonConfigByType = (buttonType: ThemeButtonType): ThemeButtonConfig => {
    return (_.find(this.props.buttons, { buttonType })!)
  }
}
