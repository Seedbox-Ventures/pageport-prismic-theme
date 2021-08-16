import React from 'react'

export * as Text from './Text'

export interface SliceData {
  slice_type: string,
  primary: Record<string, any>
}

export interface SliceProps {
  data: SliceData,
}

export interface SliceComponent<P> extends React.FC<P> {
  mapSliceDataToProps: (sliceData: SliceData) => P
}

export const slicesMapping: Record<string, any> = {
  'text': Text,
}

