import React from 'react'
import { LinkProps } from '../../basic/Link'
import { useAppDispatch, useAppSelector } from '../../../state/hooks'
import { closeMenu, openMenu, selectIsOpen, toggleMenu } from './burgerMenuSlice'
import { Overlay, StyledOverlayContainer } from '../overlay/Overlay'
import { Navigation } from '../../basic/Navigation'
import { BurgerMenuTrigger } from './BurgerMenuTrigger'
import { ThemeColorType } from '../../../theme'

export interface BurgerMenuProps {
  links: Array<LinkProps>
  iconColor?: ThemeColorType
  overlayBackgroundColor?: ThemeColorType
}

export const BurgerMenu: React.FC<BurgerMenuProps> = function ({
  links,
  iconColor = ThemeColorType.DarkText,
  overlayBackgroundColor = ThemeColorType.BackgroundDefault,
}) {
  const isOpenState = useAppSelector(selectIsOpen)
  const dispatch = useAppDispatch()

  return (
    <Overlay
      open={() => dispatch(openMenu())}
      close={() => dispatch(closeMenu())}
      isOpen={isOpenState}
      anchorRenderer={() => (
        <BurgerMenuTrigger isOpen={isOpenState} iconColor={iconColor} onClick={() => dispatch(toggleMenu())} />
      )}
    >
      <StyledOverlayContainer backgroundColor={overlayBackgroundColor}>
        <BurgerMenuTrigger
          isOpen={isOpenState}
          iconColor={iconColor}
          onClick={() => dispatch(toggleMenu())}
          customCss={{ position: 'absolute', top: '1rem', right: '3rem' }}
        />
        <Navigation items={links}></Navigation>
      </StyledOverlayContainer>
    </Overlay>
  )
}
