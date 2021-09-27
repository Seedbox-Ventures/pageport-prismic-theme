import React, { Fragment, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { OverlayConsumer, OverlayContext, OverlayProvider } from './OverlayContext'
import styled from 'styled-components'
import { ContainerSpacing, StyleHelper, ThemeColorType } from '../../theme'

export interface OverlayProps {
  open?: () => void
  close?: () => void
  anchorRenderer?: (overlayContext: OverlayContext) => ReactNode
  isOpen?: boolean
}

export const StyledOverlayContainer = styled.div<{
  backgroundColor: ThemeColorType
  padding?: Partial<ContainerSpacing>
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
    padding: StyleHelper.mergePaddings(theme.props.contentPadding, padding),
    'box-sizing': 'border-box',
  })
})

export class Overlay extends React.PureComponent<OverlayProps> {
  static _root: HTMLElement

  componentDidMount() {
    if (!Overlay._root) {
      Overlay._root = document.body || document.createElement('div')
    }
  }

  render = () => {
    const { anchorRenderer, children, isOpen } = this.props
    return (
      <OverlayProvider {...this.props}>
        <OverlayConsumer>{typeof anchorRenderer === 'function' ? anchorRenderer : () => null}</OverlayConsumer>
        <OverlayConsumer>
          {() => {
            if (Overlay._root) {
              return createPortal(<Fragment>{isOpen && children}</Fragment>, Overlay._root)
            }
          }}
        </OverlayConsumer>
      </OverlayProvider>
    )
  }
}
