import * as React from 'react'
import _ from 'lodash'
import { BreakPoint, BreakPointName, ThemeColorType } from '../../theme'
import { Section } from './Section'
import { graphql } from 'gatsby'
import { DataComponent } from './types'
import PagePort from '../../utils/PagePort'
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image'
import { IGatsbyImageData } from 'gatsby-plugin-image/dist/src/components/gatsby-image.browser'


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
  padding_bottom: string
  padding_top: string
}

export interface HeaderProps {
  backgroundColor?: ThemeColorType,
  logoPosition?: LogoPosition,
  logoWidth?: string,
  menuBreakPoint?: BreakPoint
  logo?: {
    image?: IGatsbyImageData,
    alt: string
  },
  paddingTop: string,
  paddingBottom: string
}

export const Header: DataComponent<HeaderProps, HeaderData> = (
  {
    backgroundColor = ThemeColorType.Primary,
    logo,
    paddingTop,
    paddingBottom,
  },
) => {
  return (
    <Section as='header' backgroundColor={backgroundColor} paddingTop={paddingTop} paddingBottom={paddingBottom}>
      {logo?.image && <GatsbyImage image={logo.image!} alt={logo.alt} />}
    </Section>
  )
}

Header.mapDataToProps = (headerData) => {
  const { header: { defaultData: headerDefaults } } = PagePort.config
  const {
    background_color,
    logo,
    logo_width,
    padding_top,
    padding_bottom,
  } = _.merge(headerDefaults as Partial<HeaderData>, _.omitBy(headerData, _.isEmpty))

  const props: HeaderProps = {
    backgroundColor: background_color,
    logoWidth: logo_width,
    paddingTop: padding_top ?? '1rem',
    paddingBottom: padding_bottom ?? '1rem',
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
            logo {
                alt
                gatsbyImageData(placeholder: BLURRED, height: 60)
            }
            padding_bottom
            padding_top
        }
    }
`


