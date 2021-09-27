import React, { useContext } from 'react'
import { ContainerSpacing, StyleHelper, ThemeColorType, ThemeLinkInteractiveStyle, ThemeTextType } from '../../theme'
import { LinkProps } from '../basic/Link'
import { useAppDispatch, useAppSelector } from '../../state/hooks'
import { closeMenu, openMenu, selectIsOpen, toggleMenu } from './burgerMenuSlice'
import { Overlay, StyledOverlayContainer } from '../overlay/Overlay'
import { Navigation, NavigationProps } from '../basic/Navigation'
import { BurgerMenuTrigger } from './BurgerMenuTrigger'
import { ThemeContext } from 'styled-components'
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
  overlayPadding?: Partial<ContainerSpacing>
  overlayBackgroundColor?: ThemeColorType
  orientation?: Orientation
}

export const BurgerMenu: React.FC<BurgerMenuProps> = function ({
  links,
  iconColor = ThemeColorType.DarkText,
  textType = ThemeTextType.Header,
  linkColor = ThemeColorType.DarkText,
  linkActiveStyle = ThemeLinkInteractiveStyle.ChangeColor,
  linkActiveColor = ThemeColorType.Accent,
  linkHoverStyle = ThemeLinkInteractiveStyle.ChangeColor,
  linkHoverColor = ThemeColorType.Accent,
  overlayPadding,
  overlayBackgroundColor = ThemeColorType.BackgroundDefault,
  orientation = Orientation.Left,
  children,
}) {
  const themeContext = useContext(ThemeContext)
  const dispatch = useAppDispatch()
  const isOpenState = useAppSelector(selectIsOpen)
  const containerPadding = StyleHelper.mergeContainerSpacings(themeContext.props.contentPadding, overlayPadding)
  const paddingTop = StyleHelper.extractResponsiveSpacingPart(containerPadding, 'top')
  const paddingLeft = StyleHelper.extractResponsiveSpacingPart(containerPadding, 'left')
  const paddingRight = StyleHelper.extractResponsiveSpacingPart(containerPadding, 'right')
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
      <StyledOverlayContainer backgroundColor={overlayBackgroundColor} padding={containerPadding}>
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
      </StyledOverlayContainer>
    </Overlay>
  )
}
