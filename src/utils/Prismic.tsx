import _ from 'lodash'


export const DataHelper = {
  objectKeysToCamelCase: function(obj: Object): Record<string, any> {
    let transformedObj: Record<string, any> = _.mapKeys(obj, (_v, k) => _.camelCase(k))
    transformedObj = _.mapValues(transformedObj, (v) => {
      if (typeof v === 'object') {
        return DataHelper.objectKeysToCamelCase(v)
      }
      return v
    }) as Record<string, any>
    return transformedObj
  },
}
