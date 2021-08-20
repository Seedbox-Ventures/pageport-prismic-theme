export enum PrismicLinkTypeEnum {
  Any = 'Any',
  Document = 'Document',
  Media = 'Media',
  Web = 'Web',
}

export interface PrismicLinkType {
  link_type: PrismicLinkTypeEnum
  target?: string
  id?: any // TODO implement prismics "ID" type
  uid?: string
  url?: string
  document?: any // TODO implement "PrismicAllDocumentTypes"
  localFile?: any // TODO implement prismics "File" type
}
