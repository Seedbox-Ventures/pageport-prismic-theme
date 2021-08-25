import React from 'react'
import { Text } from './Text'
import { CallToAction } from './CallToAction'


export interface SliceData {
  slice_type: string,
  primary: Record<string, any>
  items: Record<string, any>
}

export interface SliceProps {
  data: SliceData,
}

export const sliceTypeMap: Record<string, SliceComponent<any>> = {
  text: Text,
  call_to_action: CallToAction,
}

export interface SliceComponent<P> extends React.FC<P> {
  mapSliceDataToProps: (sliceData: SliceData) => P
}

