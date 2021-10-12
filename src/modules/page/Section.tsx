import * as React from 'react'
import { useContext } from 'react'
import _ from 'lodash'
import tinycolor from 'tinycolor2'
import styled, { ThemeContext, ThemeProvider } from 'styled-components'
import { ContainerSpacing, StyleHelper, StyleObject, ThemeColorType, ThemeMode } from '../../theme'
import * as CSS from 'csstype'

export interface SectionProps {
  backgroundColor: ThemeColorType
  isFullWidth?: boolean
  padding?: Partial<ContainerSpacing>
  as?: React.ElementType
  isSticky?: boolean
  customContainerStyle?: StyleObject
  className?: string
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

const Section: React.FC<SectionProps> = ({
  backgroundColor,
  isFullWidth = false,
  padding,
  isSticky = false,
  children,
  customContainerStyle,
  className,
  as = 'section',
}) => {
  const theme = useContext(ThemeContext)
  const mergedPadding = padding
    ? StyleHelper.mergeContainerSpacings(theme.props.contentPadding, padding)
    : theme.props.contentPadding
  const mode: ThemeMode = tinycolor(theme.getColorValueByType(backgroundColor)).isDark() ? 'dark' : 'light'

  return (
    <ThemeProvider theme={{ ...theme, props: { ...theme.props, mode } }}>
      <StyledSection {...{ as, backgroundColor, className, isSticky }}>
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
    </ThemeProvider>
  )
}

export default Section
