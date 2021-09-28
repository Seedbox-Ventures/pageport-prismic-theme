import './overlay.scss'
import React, { Fragment, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { OverlayConsumer, OverlayContext, OverlayProvider } from './OverlayContext'
import styled from 'styled-components'

export interface OverlayProps {
  open?: () => void
  close?: () => void
  anchorRenderer?: (overlayContext: OverlayContext) => ReactNode
  isOpen?: boolean
  backdropBackground?: string
  closeOnOutsideClick?: boolean
}

const StyledBackdrop = styled.div<{
  background: string
}>(
  ({ background = 'transparent' }) => `
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${background};
`,
)

export class Overlay extends React.PureComponent<OverlayProps> {
  static _root: HTMLElement

  componentDidMount() {
    if (!Overlay._root) {
      Overlay._root = document.createElement('div')
      Overlay._root.setAttribute('class', 'pp_overlayRoot')
      document.body.append(Overlay._root)
    }
  }

  render = () => {
    const { anchorRenderer, backdropBackground = 'transparent', children, closeOnOutsideClick = false } = this.props
    return (
      <OverlayProvider {...this.props}>
        <OverlayConsumer>{typeof anchorRenderer === 'function' ? anchorRenderer : () => null}</OverlayConsumer>
        <OverlayConsumer>
          {({ isOpen, close }) => {
            if (Overlay._root && isOpen) {
              const handleBackdropClick = () => {
                if (closeOnOutsideClick) {
                  close()
                }
              }

              return createPortal(
                <Fragment>
                  <StyledBackdrop background={backdropBackground} onClick={handleBackdropClick} />
                  {children}
                </Fragment>,
                Overlay._root,
              )
            }
          }}
        </OverlayConsumer>
      </OverlayProvider>
    )
  }
}
