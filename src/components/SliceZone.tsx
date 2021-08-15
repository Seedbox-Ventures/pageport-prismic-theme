// SliceZone.js file

import * as React from 'react'

// import { FullWidthImage } from '../slices/FullWidthImage'
// import { ImageGallery } from '../slices/ImageGallery'
// import { ImageHighlight } from '../slices/ImageHighlight'
// import { Quote } from '../slices/Quote'
import { Slice, SliceData, slicesMapping } from '../slices'

export interface SliceZoneProps {
  sliceZone: Array<SliceData>
}

export const SliceZone: React.FC<SliceZoneProps> = ({ sliceZone }) => {

  const sliceZoneContent = sliceZone.map((sliceData, index) => {
    const SliceComponent: Slice = slicesMapping[sliceData.slice_type]
    if (SliceComponent) {
      return <SliceComponent data={sliceData} key={`slice-${index}`} />
    }
    return null
  })

  return <main className='container'>{sliceZoneContent}</main>
}
