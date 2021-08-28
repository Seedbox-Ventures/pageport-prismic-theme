import * as React from 'react'
import { BreakPoint, BreakPointName, ThemeColorType } from '../../theme'
import { Section } from './Section'
import { DataComponent } from './types'
import { getImage, ImageDataLike } from 'gatsby-plugin-image'
import { IGatsbyImageData } from 'gatsby-plugin-image/dist/src/components/gatsby-image.browser'
import PagePort from '../../utils/PagePort'
import _ from 'lodash'
import { graphql } from 'gatsby'
import { PPGatsbyImage } from '../ui/Image'


export enum LogoPosition {
  Left = 'Left',
  Right = 'Right'
}

export interface HeaderData {
  background_color: ThemeColorType,
  burger_menu_breakpoint: BreakPointName | 'Never',
  logo_position: boolean,
  logo_width: string,
  logo: {
    gatsbyImageData?: ImageDataLike,
    alt?: string
  },
  is_sticky: boolean,
  padding_bottom: string
  padding_top: string
}

export interface HeaderProps {
  backgroundColor?: ThemeColorType,
  logoPosition?: LogoPosition,
  logoWidth: string,
  menuBreakPoint?: BreakPoint
  logo?: {
    image?: IGatsbyImageData,
    alt: string
  },
  isSticky?: boolean,
  paddingTop: string,
  paddingBottom: string
}

export const Header: DataComponent<HeaderProps, HeaderData> = (
  {
    backgroundColor = ThemeColorType.Primary,
    isSticky = false,
    paddingTop,
    paddingBottom,
    logo,
    logoWidth,
  },
) => (
  <Section as='header' {...{ backgroundColor, isSticky, paddingTop, paddingBottom }}>
    {logo?.image && <PPGatsbyImage image={logo.image!} alt={logo.alt} width={logoWidth} />}
  </Section>
)


Header.mapDataToProps = (headerData) => {
  const { header: { defaultData: headerDefaults } } = PagePort.config
  const {
    background_color,
    logo,
    logo_width,
    padding_top,
    padding_bottom,
    is_sticky,
  } = _.merge(headerDefaults as Partial<HeaderData>, headerData)

  const props: HeaderProps = {
    backgroundColor: background_color,
    logoWidth: logo_width,
    paddingTop: padding_top ?? '1rem',
    paddingBottom: padding_bottom ?? '1rem',
    isSticky: is_sticky,
  }

  if (!_.isEmpty(logo?.gatsbyImageData)) {
    props.logo = {
      image: getImage(logo!.gatsbyImageData!),
      alt: logo!.alt ?? '',
    }
  }

  return props
}

export const query = graphql`
    fragment PageHeader on PrismicHeader {
        data {
            background_color
            burger_menu_breakpoint
            logo_position
            logo_width
            is_sticky
            padding_bottom
            padding_top
            logo {
                gatsbyImageData(placeholder: BLURRED)
            }
        }
    }
`


