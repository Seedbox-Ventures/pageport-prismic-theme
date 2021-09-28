import React, { Component, createContext } from 'react'
import { OverlayProps } from './Overlay'

export type OverlayContext = {
  close: () => void
  isOpen: boolean
  open: () => void
}

const initialState: OverlayContext = {
  close: () => {},
  open: () => {},
  isOpen: false,
}

export const { Provider, Consumer: OverlayConsumer } = createContext<OverlayContext>(initialState)

export class OverlayProvider extends Component<OverlayProps, OverlayContext> {
  close: () => void
  open: () => void
  state = { ...initialState }

  static getDerivedStateFromProps({ isOpen = false }) {
    return { isOpen }
  }

  constructor(props: OverlayProps) {
    super(props)
    const { open, close } = props

    this.close =
      close ??
      (() => {
        this.setState({ isOpen: false })
      })

    this.open =
      open ??
      (() => {
        this.setState({ isOpen: true })
      })

    this.state = {
      close: this.close,
      open: this.open,
      isOpen: props.isOpen === undefined ? false : props.isOpen,
    }
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}
