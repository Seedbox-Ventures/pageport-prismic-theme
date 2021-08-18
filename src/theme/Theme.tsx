import _ from 'lodash'
import { DefaultTheme } from 'styled-components'
import { ThemeFontFamilyType, ThemeTextType, ThemeType, ThemeValues } from './types'

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
    return objectKeysToCamelCase(themingData) as ThemeValues
  }

  getFontFamily = (fontFamilyType: ThemeFontFamilyType): string => {
    return fontFamilyType === ThemeFontFamilyType.Secondary ? this.values.secondaryFontFamily : this.values.primaryFontFamily
  }

  getType = (textType: ThemeTextType): ThemeType | undefined => {
    return _.find(this.values.typeDefinitions, { textType })
  }

  getStandardType = (): ThemeType => {
    return this.getType(ThemeTextType.StandardText)!
  }

  renderTypeCss = (themeTextType: ThemeTextType): string => {
    const themeType = this.getType(themeTextType)

    if (!themeType) {
      return ''
    }

    const fontFamily = this.getFontFamily(themeType.fontFamily)

    return `
        font-size: ${themeType.fontSize};
        line-height: ${themeType.lineHeight};
        font-family: ${fontFamily};
    `
  }
}
