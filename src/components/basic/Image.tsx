import * as React from 'react'
import { GatsbyImageProps, IGatsbyImageData } from 'gatsby-plugin-image/dist/src/components/gatsby-image.browser'
import { GatsbyImage } from 'gatsby-plugin-image'
import { StyleHelper, StyleObject } from '../../theme'
import styled from 'styled-components'
import _ from 'lodash'

interface PPGatsbyImageProps {
  alt: string
  width: string,
  image: IGatsbyImageData,
}

interface StyledImageProps extends GatsbyImageProps {
  width: string
}

const StyledImage = styled(GatsbyImage)<StyledImageProps>(({ width }) => {
  const styleObj: StyleObject = {
    width,
  }
  const result = StyleHelper.renderCssFromObject(styleObj)
  return result
})

export const PPGatsbyImage: React.FC<PPGatsbyImageProps> = ({ alt, image, width }) => {
  const appliedImageData = { ...image }

  if (typeof width === 'string' && width !== '') {
    const pixelSizes: Array<number> = _.map<string, number>(
      StyleHelper.splitResponsiveValue(width),
      (value) => StyleHelper.toPixelNumber(value),
    )

    const maxPixelSize = Math.max(...pixelSizes)
    const { width: originalWidth, height: originalHeight } = image

    appliedImageData.width = maxPixelSize
    appliedImageData.height = (maxPixelSize / originalWidth) * originalHeight
    appliedImageData.images!.fallback!.sizes = StyleHelper.arrayToImageSizes(pixelSizes)
  }


  return <StyledImage alt={alt} image={appliedImageData} width={width} />
}
