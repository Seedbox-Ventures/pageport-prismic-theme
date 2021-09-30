import React, { Component, createContext } from 'react'

export type AccordionContext = {
  openItem: (itemKey: string | undefined) => void
  toggleItem: (itemKey: string) => void
  openItemKey?: string
}

const initialState: AccordionContext = {
  openItem: () => void 0,
  toggleItem: () => void 0,
}

export const { Provider, Consumer: AccordionConsumer } = createContext<AccordionContext>(initialState)

export interface AccordionContextProps {
  openItemKey?: string
}

export class AccordionProvider extends Component<AccordionContextProps, AccordionContext> {
  openItem(itemKey: string | undefined) {
    this.setState({ openItemKey: itemKey })
  }

  toggleItem(itemKey: string) {
    const { openItemKey: currentOpenItemKey } = this.state
    this.setState({ openItemKey: itemKey === currentOpenItemKey ? undefined : itemKey })
  }

  constructor(props: AccordionContextProps) {
    super(props)
    const { openItemKey } = props

    this.state = {
      openItem: this.openItem,
      toggleItem: this.toggleItem,
      openItemKey,
    }
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}
