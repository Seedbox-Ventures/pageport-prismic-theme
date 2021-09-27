import _ from 'lodash'
import { LinkProps, LinkTarget } from '../modules/basic/Link'

export enum PrismicLinkType {
  Document = 'Document',
  Media = 'Media',
  Web = 'Web',
}

export interface PrismicLinkData {
  link_type: PrismicLinkType
  target?: LinkTarget
  id?: any // TODO implement prismics "ID" type
  uid?: string
  url?: string
  document?: any // TODO implement "PrismicAllDocumentTypes"
  localFile?: any // TODO implement prismics "File" type
}

export const DataHelper = {
  objectKeysToCamelCase: function (obj: Object): Record<string, any> {
    let transformedObj: Record<string, any> = _.mapKeys(obj, (_v, k) => _.camelCase(k))
    transformedObj = _.mapValues(transformedObj, (v) => {
      if (typeof v === 'object') {
        return DataHelper.objectKeysToCamelCase(v)
      }
      return v
    }) as Record<string, any>
    return transformedObj
  },

  prismicLinkToLinkProps: function (prismicLinkData?: PrismicLinkData): LinkProps | undefined {
    if (!prismicLinkData?.url || prismicLinkData.url === '') {
      return undefined
    }

    const { url, target, link_type } = prismicLinkData

    return {
      url,
      target,
      internal: link_type === PrismicLinkType.Document,
    }
  },
}
