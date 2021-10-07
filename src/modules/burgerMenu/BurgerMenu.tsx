import React, { useContext } from 'react'
import { ContainerSpacing, StyleHelper, ThemeColorType, ThemeTextType } from '../../theme'
import { LinkProps, LinkStyle } from '../basic/Link'
import { useAppDispatch, useAppSelector } from '../../state/hooks'
import { closeMenu, openMenu, selectIsOpen, toggleMenu } from './burgerMenuSlice'
import  BurgerMenuTrigger  from './BurgerMenuTrigger'
import styled, { ThemeContext } from 'styled-components'
import Navigation, { NavigationProps } from '../basic/Navigation'
import { Orientation } from '../page/Header'
import Overlay from '../overlay/Overlay'

export interface BurgerMenuProps {
  links: Array<LinkProps>
  iconColor?: ThemeColorType
  textType?: ThemeTextType
  linkStyle?: LinkStyle
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

const BurgerMenu: React.FC<BurgerMenuProps> = function ({
  links,
  iconColor = ThemeColorType.DarkText,
  textType = ThemeTextType.Header,
  linkStyle,
  containerPadding,
  backgroundColor = ThemeColorType.BackgroundDefault,
  orientation = Orientation.Left,
  children,
}) {
  const dispatch = useAppDispatch()
  const openingFunc = () => dispatch(openMenu())
  const closingFunc = () => dispatch(closeMenu())
  const themeContext = useContext(ThemeContext)
  const isOpenState = useAppSelector(selectIsOpen)
  const mergedContainerPadding = StyleHelper.mergeContainerSpacings(themeContext.props.contentPadding, containerPadding)
  const paddingTop = StyleHelper.extractResponsiveSpacingPart(mergedContainerPadding, 'top')
  const paddingLeft = StyleHelper.extractResponsiveSpacingPart(mergedContainerPadding, 'left')
  const paddingRight = StyleHelper.extractResponsiveSpacingPart(mergedContainerPadding, 'right')
  const navigationProps: NavigationProps = {
    items: links,
    textType,
    linkStyle,
    onItemClick: closingFunc,
  }

  return (
    <Overlay
      open={openingFunc}
      close={closingFunc}
      isOpen={isOpenState}
      anchor={() => (
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

export default BurgerMenu
