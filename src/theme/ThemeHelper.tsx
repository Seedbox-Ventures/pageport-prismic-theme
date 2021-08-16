import { ThemeFontFamilyType, ThemeTextType, ThemeType, ThemeValues } from './types'
import _ from 'lodash'

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

export const ThemeHelper = {
  mapThemingData: (themingData: Record<string, any>): Partial<ThemeValues> => {
    return objectKeysToCamelCase(themingData) as ThemeValues
  },

  getFontFamily: (fontFamilyType: ThemeFontFamilyType, themeValues: ThemeValues): string => {
    return fontFamilyType === ThemeFontFamilyType.Secondary ? themeValues.secondaryFontFamily : themeValues.primaryFontFamily
  },

  getType: (textType: ThemeTextType, themeValues: ThemeValues): ThemeType | undefined => {
    return _.find(themeValues.typeDefinitions, { textType })
  },

  getStandardType: (themeValues: ThemeValues): ThemeType => {
    return ThemeHelper.getType(ThemeTextType.StandardText, themeValues)!
  },

  renderTypeCss: (themeTextType: ThemeTextType, themeValues: ThemeValues): string => {
    const themeType = ThemeHelper.getType(themeTextType, themeValues)

    if (!themeType) {
      return ''
    }

    const fontFamily = ThemeHelper.getFontFamily(themeType.fontFamily, themeValues)

    return `
        font-size: ${themeType.fontSize};
        line-height: ${themeType.lineHeight};
        font-family: ${fontFamily};
    `
  },
}
