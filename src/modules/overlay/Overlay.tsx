import React, { Fragment, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { OverlayConsumer, OverlayContext, OverlayProvider } from './OverlayContext'

export interface OverlayProps {
  open?: () => void
  close?: () => void
  anchorRenderer?: (overlayContext: OverlayContext) => ReactNode
  isOpen?: boolean
  displayBackdrop?: boolean
  backdropBackground?: string
}

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
