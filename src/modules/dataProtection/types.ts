export enum DataSinkCategory {
  Essential= 'Essential',
  ExternalData= 'External Data',
  Marketing= 'Marketing',
  Statistics= 'Statistics',
}

export interface DataSink {
  name: string,
  category: DataSinkCategory,
  accepted?: boolean,
  tagId?: string,
  provider?: string,
  gdprLink?: string,
  purpose?: string,
  integrationCode?: string
}
