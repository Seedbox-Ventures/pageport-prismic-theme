import _ from 'lodash'
import PagePort from '../utils/PagePort'
import tinycolor from 'tinycolor2'

export enum BreakPointName {
  Phone = 'Phone',
  Tablet = 'Tablet',
  Laptop = 'Laptop',
  Desktop = 'Desktop',
}

export interface BreakPoint {
  name: BreakPointName
  value: number
}

export type StyleObject = Record<string, string | number | undefined>

export const breakPoints: Array<BreakPoint> = _.sortBy(
  _.map(PagePort.config.breakpoints, (value, breakPointName) => ({
    name: breakPointName as BreakPointName,
    value: value,
  })),
  'value',
)

export interface SpacingObject extends Record<string, string | undefined> {
  top?: string
  right?: string
  bottom?: string
  left?: string
}

export type ContainerSpacing = string | SpacingObject

export interface ResponsiveStyleMap extends Partial<Record<BreakPointName, Partial<StyleObject>>> {}

export class StyleHelper {
  static getBreakPointValue = (breakPointName: BreakPointName): number => {
    return PagePort.config.breakpoints[breakPointName]
  }

  static mergePaddings = (...paddings: Array<ContainerSpacing | undefined>): string => {
    return StyleHelper.mergeContainerSpacings(...paddings)
  }

  static mergeMargins = (...margins: Array<ContainerSpacing>): string => {
    return StyleHelper.mergeContainerSpacings(...margins)
  }

  static mergeContainerSpacings = (...spacings: Array<ContainerSpacing | undefined>): string => {
    const breakPointSpacings = _.map(
      _.omitBy(
        _.map(spacings, (spacing) => {
          if (typeof spacing === 'undefined') {
            return undefined
          }
          if (typeof spacing === 'string') {
            return _.mapValues(StyleHelper.extractResponsiveAttributeMap(spacing), StyleHelper.spacingStringToObject)
          }
          let _lastSpacings: Partial<SpacingObject> = {}
          return _.mapValues(StyleHelper.extractResponsiveStyleMap(spacing), (v) => {
            _lastSpacings = _.merge(_lastSpacings, v)
            return _lastSpacings
          })
        }),
        _.isEmpty,
      ),
      (breakPointSpacing) => {
        const resultSpacings: Partial<Record<BreakPointName, SpacingObject>> = {}
        let lastBreakPointName: BreakPointName
        _.each(breakPoints, ({ name: breakPointName }) => {
          if (!lastBreakPointName) {
            resultSpacings[breakPointName] = breakPointSpacing[breakPointName]
          } else {
            resultSpacings[breakPointName] = breakPointSpacing[breakPointName] ?? resultSpacings[lastBreakPointName]
          }
          lastBreakPointName = breakPointName
        })
        return resultSpacings
      },
    )

    const mergedBreakPointSpacings: Array<string> = []
    let _lastMergedSpacings: SpacingObject = { top: '0', right: '0', bottom: '0', left: '0' }
    _.each(breakPoints, ({ name: breakPointName }) => {
      _lastMergedSpacings = _.merge(_lastMergedSpacings, ..._.map(breakPointSpacings, breakPointName))
      mergedBreakPointSpacings.push(StyleHelper.SpacingObjectToString(_lastMergedSpacings))
    })

    while (
      mergedBreakPointSpacings.length > 1 &&
      _.isEqual(
        mergedBreakPointSpacings[mergedBreakPointSpacings.length - 1],
        mergedBreakPointSpacings[mergedBreakPointSpacings.length - 2],
      )
    ) {
      mergedBreakPointSpacings.pop()
    }

    return mergedBreakPointSpacings.join('|')
  }

  static SpacingObjectToString = (spacingObject: SpacingObject): string => {
    if (spacingObject.left !== spacingObject.right) {
      return `${spacingObject.top} ${spacingObject.right} ${spacingObject.bottom} ${spacingObject.left}`
    }
    if (spacingObject.bottom !== spacingObject.top) {
      return `${spacingObject.top} ${spacingObject.right} ${spacingObject.bottom}`
    }
    if (spacingObject.right !== spacingObject.top) {
      return `${spacingObject.top} ${spacingObject.right}`
    }
    return `${spacingObject.top}`
  }

  static spacingStringToObject = (spacingString: string): SpacingObject => {
    const stringParts = spacingString.split(/(\s+)/)

    return {
      top: stringParts[0],
      right: stringParts[1] ?? stringParts[0],
      bottom: stringParts[2] ?? stringParts[0],
      left: stringParts[3] ?? stringParts[1] ?? stringParts[0],
    }
  }

  static renderCssFromObject = (cssDefinitions: StyleObject): string => {
    const responsiveStyleMap = StyleHelper.extractResponsiveStyleMap(cssDefinitions)

    return _.map(responsiveStyleMap, (styles: Partial<StyleObject>, breakPoint: BreakPointName) => {
      if (_.isEmpty(styles)) {
        return undefined
      }
      const styleParts = _.map(styles, (cssValue, cssAttr) => `${cssAttr}: ${cssValue};`)
      if (breakPoint !== BreakPointName.Phone) {
        styleParts.unshift(`@media (min-width: ${StyleHelper.getBreakPointValue(breakPoint)}px ) {`)
        styleParts.push('}')
      }
      return styleParts.join('\n\r')
    }).join('\n\r')
  }

  static extractResponsiveStyleMap = (cssDefinitions: StyleObject): ResponsiveStyleMap => {
    const responsiveStyleMap: ResponsiveStyleMap = {}

    _.each(cssDefinitions, (values, attr) => {
      if (_.isEmpty(values)) {
        return {}
      }
      const responsiveAttributeStyleMap = StyleHelper.extractResponsiveAttributeMap(values)
      _.each(Object.keys(responsiveAttributeStyleMap), (key) => {
        const breakPointName: BreakPointName = key as BreakPointName
        responsiveStyleMap[breakPointName] = responsiveStyleMap[breakPointName] ?? {}
        responsiveStyleMap[breakPointName]![attr] = responsiveAttributeStyleMap[breakPointName]
      })
    })

    return responsiveStyleMap
  }

  static extractResponsiveAttributeMap = (
    attributeValue: string | number | undefined,
  ): Partial<Record<BreakPointName, string>> => {
    if (typeof attributeValue === 'undefined' || attributeValue === '') {
      return {}
    }
    if (typeof attributeValue === 'number') {
      return { [BreakPointName.Phone]: attributeValue!.toString() }
    }
    const responsiveAttributeMap: Partial<Record<BreakPointName, string>> = {}
    const attrValues = StyleHelper.splitResponsiveValue(attributeValue)
    _.each(attrValues, (v, i) => {
      if (i >= breakPoints.length) {
        return
      }

      const breakPointName = breakPoints[i].name
      responsiveAttributeMap[breakPointName] = v
    })
    return responsiveAttributeMap
  }

  static splitResponsiveValue = (responsiveValue: string): Array<string> => {
    return responsiveValue ? responsiveValue.split('|') : []
  }

  static toPixelNumber = (cssSize: string, bodyFontSize: number = 16, localFontSize: number = 16): number => {
    const supportedUnits: Record<string, (value: number) => number> = {
      px: (value: number) => value,
      rem: (value: number) => value * bodyFontSize,
      em: (value: number) => value * localFontSize,
    }

    const pattern = new RegExp(`^([\-\+]?(?:\\d+(?:\\.\\d+)?))(${Object.keys(supportedUnits).join('|')})?$`, 'i')
    const matches = cssSize.trim().match(pattern)

    if (matches) {
      const value = Number(matches[1])
      if (matches!.length < 3) {
        return value
      }
      const unit = matches[2].toLocaleLowerCase()

      if (unit === '') {
        return value
      }

      // Sanity check, make sure unit conversion function exists
      if (unit in supportedUnits) {
        return supportedUnits[unit](value)
      }
    }

    throw new Error('Unsupported css value. Pleas use only px, rem or em values with this function')
  }

  static arrayToImageSizes(sizes: Array<number>): string {
    const stringParts: Array<string> = _.reverse(
      _.map<number, string>(sizes, (size, i) => {
        const sizeParts = []
        const breakPoint = breakPoints[i]
        if (breakPoint.value !== 0) {
          sizeParts.unshift(`(min-width: ${breakPoint.value}px)`)
        }
        sizeParts.push(`${size}px`)
        return sizeParts.join(' ')
      }),
    )
    return stringParts.join(',')
  }

  static lightenDarken = (colorValue: `#${string}`, amount = 10): `${string}` =>
    `${(tinycolor(colorValue).isDark()
      ? tinycolor(colorValue).brighten(amount)
      : tinycolor(colorValue).darken(amount)
    ).toHexString()}`
}
