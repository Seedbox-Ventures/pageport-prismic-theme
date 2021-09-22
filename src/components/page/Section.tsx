import * as React from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { StyleHelper, StyleObject, ThemeColorType } from '../../theme'
import * as CSS from 'csstype'

export interface SectionProps {
  backgroundColor: ThemeColorType
  isFullWidth?: boolean
  paddingTop?: string
  paddingBottom?: string
  as?: React.ElementType
  isSticky?: boolean
  customContainerStyle?: StyleObject
}

export const StyledSection = styled.div<{
  as?: React.ElementType
  backgroundColor: ThemeColorType
  isSticky: boolean
  customCss?: StyleObject
}>(({ backgroundColor, isSticky, theme, customCss = {} }) =>
  StyleHelper.renderCssFromObject(
    _.merge(
      {
        color: theme.getTextColorValueByBackground(backgroundColor),
        'background-color': theme.getColorValueByType(backgroundColor),
        position: isSticky ? 'sticky' : 'static',
        width: '100%',
      },
      customCss,
    ),
  ),
)

const ContentContainer = styled.div<{
  isFullWidth: boolean
  paddingTop?: string
  paddingBottom?: string
  flexDirection?: CSS.Property.FlexDirection
  customContainerStyle?: StyleObject
}>(({ isFullWidth, paddingTop, paddingBottom, flexDirection = 'column', theme, customContainerStyle = {} }) => {
  const styleObj: StyleObject = _.merge(
    {},
    {
      display: 'flex',
      'flex-direction': flexDirection,
      position: 'relative',
      margin: '0 auto',
      'max-width': isFullWidth ? '100%' : theme.props.contentMaxWidth,
      padding: StyleHelper.mergePaddings(theme.props.contentPadding, { top: paddingTop, bottom: paddingBottom }),
    },
    customContainerStyle,
  )
  return StyleHelper.renderCssFromObject(styleObj)
})

export const Section: React.FC<SectionProps> = ({
  backgroundColor,
  isFullWidth = false,
  paddingTop,
  paddingBottom,
  isSticky = false,
  children,
  customContainerStyle,
  as = 'section',
}) => {
  return (
    <StyledSection {...{ as, backgroundColor, isSticky }}>
      <ContentContainer
        {...{
          className: 'contentContainer',
          isFullWidth,
          paddingTop,
          paddingBottom,
          customContainerStyle,
        }}
      >
        {children}
      </ContentContainer>
    </StyledSection>
  )
}
