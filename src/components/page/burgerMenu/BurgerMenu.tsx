import React, { useContext } from 'react'
import { ContainerSpacing, StyleHelper, ThemeColorType } from '../../../theme'
import { LinkProps } from '../../basic/Link'
import { useAppDispatch, useAppSelector } from '../../../state/hooks'
import { closeMenu, openMenu, selectIsOpen, toggleMenu } from './burgerMenuSlice'
import { Overlay, StyledOverlayContainer } from '../overlay/Overlay'
import { Navigation } from '../../basic/Navigation'
import { BurgerMenuTrigger } from './BurgerMenuTrigger'
import { ThemeContext } from 'styled-components'

export interface BurgerMenuProps {
  links: Array<LinkProps>
  iconColor?: ThemeColorType
  overlayPadding?: Partial<ContainerSpacing>
  overlayBackgroundColor?: ThemeColorType
}

export const BurgerMenu: React.FC<BurgerMenuProps> = function ({
  links,
  iconColor = ThemeColorType.DarkText,
  overlayPadding,
  overlayBackgroundColor = ThemeColorType.BackgroundDefault,
}) {
  const themeContext = useContext(ThemeContext)
  const dispatch = useAppDispatch()
  const isOpenState = useAppSelector(selectIsOpen)
  const containerPadding = StyleHelper.mergeContainerSpacings(themeContext.props.contentPadding, overlayPadding)

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
            top: StyleHelper.extractResponsiveSpacingPart(containerPadding, 'top'),
            right: StyleHelper.extractResponsiveSpacingPart(containerPadding, 'right'),
          }}
        />

        <Navigation items={links}/>
      </StyledOverlayContainer>
    </Overlay>
  )
}
