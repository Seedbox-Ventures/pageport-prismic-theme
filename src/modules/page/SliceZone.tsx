import * as React from 'react'
import { DataComponent } from './types'

export interface SliceData<P = Record<string, any>, I = any> {
  slice_type: string
  id: string
  primary: P
  items?: Array<I>
}

export interface SliceProps {
  data: SliceData
}

export interface SliceComponentMap extends Partial<Record<string, SliceComponent<any>>> {}

export interface SliceComponent<P> extends DataComponent<P, SliceData> {}

export interface SliceZoneProps {
  slicesData: Array<SliceData>
  sliceComponentMap: SliceComponentMap
}

const SliceZone: React.FC<SliceZoneProps> = ({ slicesData, sliceComponentMap }) => {
  const sliceZoneContent = slicesData.map((sliceData, index) => {
    const SliceComponent = sliceComponentMap[sliceData?.slice_type]
    if (SliceComponent && sliceData?.primary) {
      return <SliceComponent key={`slice-${index}`} {...SliceComponent.mapDataToProps(sliceData)} />
    }
    return null
  })

  return <main className="container">{sliceZoneContent}</main>
}

export default SliceZone
