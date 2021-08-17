import React from 'react'
import { Text } from './Text'


export interface SliceData {
  slice_type: string,
  primary: Record<string, any>
}

export interface SliceProps {
  data: SliceData,
}

export const sliceTypeMap: Record<string, SliceComponent<any>> = {
  text: Text,
}

export interface SliceComponent<P> extends React.FC<P> {
  mapSliceDataToProps: (sliceData: SliceData) => P
}

export const slicesMapping: Record<string, any> = {
  'text': Text,
}

