import * as React from 'react'
import { useContext } from 'react'
import _ from 'lodash'
import styled, { ThemeContext } from 'styled-components'
import { ContainerSpacing, StyleHelper, StyleObject, ThemeColorType } from '../../theme'
import * as CSS from 'csstype'

export interface SectionProps {
  backgroundColor: ThemeColorType
  isFullWidth?: boolean
  padding: Partial<ContainerSpacing>
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
  padding: ContainerSpacing
  flexDirection?: CSS.Property.FlexDirection
  customContainerStyle?: StyleObject
}>(({ isFullWidth, padding, flexDirection = 'column', theme, customContainerStyle = {} }) => {
  const styleObj: StyleObject = _.merge(
    {},
    {
      display: 'flex',
      'flex-direction': flexDirection,
      position: 'relative',
      margin: '0 auto',
      'max-width': isFullWidth ? '100%' : theme.props.contentMaxWidth,
      padding: padding,
    },
    customContainerStyle,
  )
  return StyleHelper.renderCssFromObject(styleObj)
})

export const Section: React.FC<SectionProps> = ({
  backgroundColor,
  isFullWidth = false,
  padding,
  isSticky = false,
  children,
  customContainerStyle,
  as = 'section',
}) => {
  const theme = useContext(ThemeContext)
  const mergedPadding = StyleHelper.mergeContainerSpacings(theme.props.contentPadding, padding)

  return (
    <StyledSection {...{ as, backgroundColor, isSticky }}>
      <ContentContainer
        {...{
          className: 'contentContainer',
          isFullWidth,
          padding: mergedPadding,
          customContainerStyle,
        }}
      >
        {children}
      </ContentContainer>
    </StyledSection>
  )
}
