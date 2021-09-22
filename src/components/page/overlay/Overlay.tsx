import React, { Fragment, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { OverlayConsumer, OverlayContext, OverlayProvider } from './OverlayContext'
import styled from 'styled-components'
import { ContainerSpacing, StyleHelper, ThemeColorType } from '../../../theme'

export interface OverlayProps {
  open?: () => void
  close?: () => void
  anchorRenderer?: (overlayContext: OverlayContext) => ReactNode
  isOpen?: boolean
}

export interface IOverlay extends React.FC<OverlayProps> {
  root: HTMLElement
}

export const StyledOverlayContainer = styled.div<{ backgroundColor: ThemeColorType; padding?: ContainerSpacing }>(
  ({ backgroundColor, padding, theme }) => {
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
  },
)

export const Overlay: IOverlay = (props) => {
  const { anchorRenderer, children, isOpen } = props

  return (
    <OverlayProvider {...props}>
      <OverlayConsumer>{typeof anchorRenderer === 'function' ? anchorRenderer : () => null}</OverlayConsumer>
      <OverlayConsumer>{() => createPortal(<Fragment>{isOpen && children}</Fragment>, Overlay.root)}</OverlayConsumer>
    </OverlayProvider>
  )
}

Overlay.root = document.body || document.createElement('div')
