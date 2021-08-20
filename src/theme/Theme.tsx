import _ from 'lodash'
import { DefaultTheme } from 'styled-components'
import {
  ThemeBackgroundColor,
  ThemeColorType,
  ThemeFontFamilyType,
  ThemeTextColor,
  ThemeTextType,
  ThemeType,
  ThemeValues,
  ThemeButtonType,
  ThemeButtonConfig
} from './types'
import { StyleHelper } from './Style'

const tinycolor = require('tinycolor2')


const objectKeysToCamelCase = (obj: Object): Record<string, any> => {
  let transformedObj: Record<string, any> = _.mapKeys(obj, (_v, k) => _.camelCase(k))
  transformedObj = _.mapValues(transformedObj, (v) => {
    if (typeof v === 'object') {
      return objectKeysToCamelCase(v)
    }
    return v
  }) as Record<string, any>
  return transformedObj
}

export class Theme implements DefaultTheme {
  readonly values: ThemeValues

  constructor(themeValues: ThemeValues) {
    this.values = themeValues
  }

  static mapThemingData = (themingData: Record<string, any>): Partial<ThemeValues> => {
    return _.omitBy(objectKeysToCamelCase(themingData), _.isEmpty) as ThemeValues
  }

  getColorValueByType = (colorType: ThemeColorType): `#${string}` => {
    return (_.find(this.values.colors, { colorType })!).value
  }

  getFontFamily = (fontFamilyType: ThemeFontFamilyType): string => {
    return fontFamilyType === ThemeFontFamilyType.Secondary ? this.values.secondaryFontFamily : this.values.primaryFontFamily
  }

  getTextColorValueByBackground = (background: ThemeBackgroundColor): `#${string}` => {
    const backgroundColorValue: `#${string}` = this.getColorValueByType(background)
    return this.getTextColorValueByBackgroundValue(backgroundColorValue)
  }

  getTextColorValueByBackgroundValue = (background: `#${string}`): `#${string}` => {
    const textColor: ThemeTextColor = tinycolor(background).isDark() ? ThemeColorType.LightText : ThemeColorType.DarkText
    return this.getColorValueByType(textColor)
  }

  getType = (textType: ThemeTextType): ThemeType | undefined => {
    return _.find(this.values.typeDefinitions, { textType })
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
    return (_.find(this.values.colorMapping, { buttonType })!)
  }
}
