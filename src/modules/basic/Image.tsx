import * as React from 'react'
import { GatsbyImageProps, IGatsbyImageData } from 'gatsby-plugin-image/dist/src/components/gatsby-image.browser'
import { GatsbyImage } from 'gatsby-plugin-image'
import { StyleHelper } from '../../theme'
import styled from 'styled-components'
import _ from 'lodash'

export interface ImageProps {
  alt: string
  width: string
  image: IGatsbyImageData
}

interface StyledImageProps extends GatsbyImageProps {
  width: string
}

const StyledImage = styled(GatsbyImage)<StyledImageProps>(({ width }) => {
  return StyleHelper.renderCssFromObject({
    width,
  })
})

const Image: React.FC<ImageProps> = ({ alt, image, width }) => {
  const appliedImageData = { ...image }

  if (width !== '') {
    const pixelSizes: Array<number> = _.map<string, number>(StyleHelper.splitResponsiveValue(width), (value) =>
      StyleHelper.toPixelNumber(value),
    )

    const maxPixelSize = Math.max(...pixelSizes)
    const { width: originalWidth, height: originalHeight } = image

    appliedImageData.width = maxPixelSize
    appliedImageData.height = (maxPixelSize / originalWidth) * originalHeight
    appliedImageData.images!.fallback!.sizes = StyleHelper.arrayToImageSizes(pixelSizes)
  }

  return <StyledImage alt={alt} image={appliedImageData} width={width} />
}

export default Image
