// SliceZone.js file

import * as React from 'react'

// import { FullWidthImage } from '../slices/FullWidthImage'
// import { ImageGallery } from '../slices/ImageGallery'
// import { ImageHighlight } from '../slices/ImageHighlight'
// import { Quote } from '../slices/Quote'
import { SliceData, sliceTypeMap } from '../sections'


export interface SliceZoneProps {
  sliceZone: Array<SliceData>
}

export const SliceZone: React.FC<SliceZoneProps> = ({ sliceZone }) => {
  const sliceZoneContent = sliceZone.map((sliceData, index) => {
    const SliceComponent = sliceTypeMap[sliceData.slice_type]
    if (SliceComponent) {
      return <SliceComponent key={`slice-${index}`} {...SliceComponent.mapSliceDataToProps(sliceData)} />
    }
    return null
  })

  return <main className='container'>{sliceZoneContent}</main>
}
