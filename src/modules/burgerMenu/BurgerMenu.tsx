import React, { useContext } from 'react'
import { ContainerSpacing, StyleHelper, ThemeColorType, ThemeLinkInteractiveStyle, ThemeTextType } from '../../theme'
import { LinkProps } from '../basic/Link'
import { useAppDispatch, useAppSelector } from '../../state/hooks'
import { closeMenu, openMenu, selectIsOpen, toggleMenu } from './burgerMenuSlice'
import { Overlay } from '../overlay/Overlay'
import { Navigation, NavigationProps } from '../basic/Navigation'
import { BurgerMenuTrigger } from './BurgerMenuTrigger'
import styled, { ThemeContext } from 'styled-components'
import { Orientation } from '../page/Header'

export interface BurgerMenuProps {
  links: Array<LinkProps>
  iconColor?: ThemeColorType
  textType?: ThemeTextType
  linkColor?: ThemeColorType
  linkActiveStyle?: ThemeLinkInteractiveStyle
  linkActiveColor?: ThemeColorType
  linkHoverStyle?: ThemeLinkInteractiveStyle
  linkHoverColor?: ThemeColorType
  containerPadding?: Partial<ContainerSpacing>
  backgroundColor?: ThemeColorType
  orientation?: Orientation
}

const StyledContentContainer = styled.div<{
  backgroundColor: ThemeColorType
  padding?: ContainerSpacing
}>(({ backgroundColor, padding, theme }) => {
  return StyleHelper.renderCssFromObject({
    position: 'fixed',
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    background: theme.getColorValueByType(backgroundColor),
    padding: padding ? StyleHelper.paddingToString(padding) : 0,
    'box-sizing': 'border-box',
  })
})

export const BurgerMenu: React.FC<BurgerMenuProps> = function ({
  links,
  iconColor = ThemeColorType.DarkText,
  textType = ThemeTextType.Header,
  linkColor = ThemeColorType.DarkText,
  linkActiveStyle = ThemeLinkInteractiveStyle.ChangeColor,
  linkActiveColor = ThemeColorType.Accent,
  linkHoverStyle = ThemeLinkInteractiveStyle.ChangeColor,
  linkHoverColor = ThemeColorType.Accent,
  containerPadding,
  backgroundColor = ThemeColorType.BackgroundDefault,
  orientation = Orientation.Left,
  children,
}) {
  const themeContext = useContext(ThemeContext)
  const dispatch = useAppDispatch()
  const isOpenState = useAppSelector(selectIsOpen)
  const mergedContainerPadding = StyleHelper.mergeContainerSpacings(themeContext.props.contentPadding, containerPadding)
  const paddingTop = StyleHelper.extractResponsiveSpacingPart(mergedContainerPadding, 'top')
  const paddingLeft = StyleHelper.extractResponsiveSpacingPart(mergedContainerPadding, 'left')
  const paddingRight = StyleHelper.extractResponsiveSpacingPart(mergedContainerPadding, 'right')
  const navigationProps: NavigationProps = {
    items: links,
    textType,
    linkColor,
    linkActiveStyle,
    linkActiveColor,
    linkHoverStyle,
    linkHoverColor,
  }

  return (
    <Overlay
      open={() => dispatch(openMenu())}
      close={() => dispatch(closeMenu())}
      isOpen={isOpenState}
      anchorRenderer={() => (
        <BurgerMenuTrigger isOpen={isOpenState} iconColor={iconColor} onClick={() => dispatch(toggleMenu())} />
      )}
    >
      <StyledContentContainer backgroundColor={backgroundColor} padding={mergedContainerPadding}>
        <BurgerMenuTrigger
          isOpen={isOpenState}
          iconColor={iconColor}
          onClick={() => dispatch(toggleMenu())}
          customCss={{
            position: 'absolute',
            top: paddingTop,
            left: orientation === Orientation.Right ? paddingLeft : undefined,
            right: orientation === Orientation.Left ? paddingRight : undefined,
          }}
        />
        <Navigation {...navigationProps} />
        {children}
      </StyledContentContainer>
    </Overlay>
  )
}
