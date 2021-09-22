import React, { useContext } from 'react'
import { StyleHelper, ThemeColorType } from '../../../theme'
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
  overlayBackgroundColor?: ThemeColorType
}

export const BurgerMenu: React.FC<BurgerMenuProps> = function ({
  links,
  iconColor = ThemeColorType.DarkText,
  overlayBackgroundColor = ThemeColorType.BackgroundDefault,
}) {
  const themeContext = useContext(ThemeContext)
  const dispatch = useAppDispatch()
  const isOpenState = useAppSelector(selectIsOpen)

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
          customCss={{
            position: 'absolute',
            top: '1rem',
            right: StyleHelper.extractResponsiveSpacingPart(themeContext.props.contentPadding, 'right'),
          }}
        />
        <Navigation items={links}></Navigation>
      </StyledOverlayContainer>
    </Overlay>
  )
}
