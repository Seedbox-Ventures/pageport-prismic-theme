import _ from 'lodash'
import { styling as styleConfig } from '../../pageport-config'

export enum BreakPointName {
  Phone = 'phone',
  Tablet = 'tablet',
  Laptop = 'laptop',
  Desktop = 'desktop'
}

export interface BreakPoint {
  name: BreakPointName
  value: number
}

export const breakPoints: Array<BreakPoint> = _.sortBy(
  _.map(styleConfig.breakpoints, (value, breakPointName) => ({
    name: breakPointName as BreakPointName,
    value: value,
  })),
  'value',
)

export interface SpacingObject extends Record<string, string | undefined> {
  top?: string,
  right?: string,
  bottom?: string,
  left?: string
}

export type ContainerSpacing = string | SpacingObject


export interface ResponsiveStyleMap extends Partial<Record<BreakPointName, Partial<Record<string, string>>>> {
}


export class StyleHelper {
  static getBreakPointValue = (breakPointName: BreakPointName): number => {
    return styleConfig.breakpoints[breakPointName]
  }

  static mergePaddings = (...paddings: Array<ContainerSpacing>): string => {
    return StyleHelper.mergeContainerSpacings(...paddings)
  }

  static mergeMargins = (...margins: Array<ContainerSpacing>): string => {
    return StyleHelper.mergeContainerSpacings(...margins)
  }

  static mergeContainerSpacings = (...spacings: Array<ContainerSpacing>): string => {
    const breakPointSpacings = _.omitBy(_.map(spacings, (spacing) => {
      if (typeof spacing === 'string') {
        return _.mapValues(StyleHelper.extractResponsiveAttributeMap(spacing), StyleHelper.spacingStringToObject)
      }
      let _lastSpacings: Partial<SpacingObject> = {}
      return _.mapValues(StyleHelper.extractResponsiveStyleMap(spacing), (v) => {
        _lastSpacings = _.merge(_lastSpacings, v)
        return _lastSpacings
      })
    }), _.isEmpty)

    const mergedBreakPointSpacings: Array<string> = []
    let _lastMergedSpacings: SpacingObject = { top: '0', right: '0', bottom: '0', left: '0' }
    _.each(breakPoints, ({ name: breakPointName }) => {
      _lastMergedSpacings = _.merge(_lastMergedSpacings, ...(_.map(breakPointSpacings, breakPointName)))
      mergedBreakPointSpacings.push(StyleHelper.SpacingObjectToString(_lastMergedSpacings))
    })

    while (mergedBreakPointSpacings.length > 1 && _.isEqual(mergedBreakPointSpacings[mergedBreakPointSpacings.length - 1], mergedBreakPointSpacings[mergedBreakPointSpacings.length - 2])) {
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

  static renderCssFromObject = (cssDefinitions: Record<string, string>): string => {
    const responsiveStyleMap = StyleHelper.extractResponsiveStyleMap(cssDefinitions)

    return _.map(responsiveStyleMap, (styles: Partial<Record<string, string>>, breakPoint: BreakPointName) => {
      if (_.isEmpty(styles)) {
        return undefined
      }
      const styleParts = _.map(styles, (cssValue, cssAttr) => (`${cssAttr}: ${cssValue};`))
      if (breakPoint !== BreakPointName.Phone) {
        styleParts.unshift(`@media (min-width: ${StyleHelper.getBreakPointValue(breakPoint)}px ) {`)
        styleParts.push('}')
      }
      return styleParts.join('\n\r')
    }).join('\n\r')
  }

  static extractResponsiveStyleMap = (cssDefinitions: Record<string, string | undefined>): ResponsiveStyleMap => {
    const responsiveStyleMap: ResponsiveStyleMap = {}

    _.each(cssDefinitions, (values, attr) => {
      if (_.isEmpty(values)) {
        return {}
      }
      const responsiveAttributeStyleMap = StyleHelper.extractResponsiveAttributeMap(values)
      _.each(Object.keys(responsiveAttributeStyleMap), (key) => {
        const breakPointName: BreakPointName = key as BreakPointName
        responsiveStyleMap[breakPointName] = (responsiveStyleMap[breakPointName] ?? {})
        responsiveStyleMap[breakPointName]![attr] = responsiveAttributeStyleMap[breakPointName]
      })
    })

    return responsiveStyleMap
  }

  static extractResponsiveAttributeMap = (attributeValue: string | undefined): Partial<Record<BreakPointName, string>> => {
    if (_.isEmpty(attributeValue)) {
      return {}
    }
    const responsiveAttributeMap: Partial<Record<BreakPointName, string>> = {}
    const attrValues = attributeValue!.split('|')
    _.each(attrValues, (v, i) => {
      if (i >= breakPoints.length) {
        return
      }

      const breakPointName = breakPoints[i].name
      responsiveAttributeMap[breakPointName] = v
    })
    return responsiveAttributeMap
  }
}
