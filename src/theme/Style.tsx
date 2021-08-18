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


export interface ResponsiveStyleMap extends Partial<Record<BreakPointName, Partial<Record<string, string>>>> {
}


export const StyleHelper = {
  getBreakPointValue: (breakPointName: BreakPointName): number => {
    return styleConfig.breakpoints[breakPointName]
  },

  renderCssFromObject: (cssDefinitions: Record<string, string>): string => {
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
  },

  extractResponsiveStyleMap: (cssDefinitions: Record<string, string>): ResponsiveStyleMap => {
    const responsiveStyleMap: ResponsiveStyleMap = {}

    _.each(cssDefinitions, (values, attr) => {
      const attrValues = values.split(',')
      _.each(attrValues, (v, i) => {
        const breakPointName = breakPoints[i].name
        responsiveStyleMap[breakPointName] = responsiveStyleMap[breakPointName] ?? {}
        responsiveStyleMap[breakPointName]![attr] = v
      })
    })

    return responsiveStyleMap
  },
}
