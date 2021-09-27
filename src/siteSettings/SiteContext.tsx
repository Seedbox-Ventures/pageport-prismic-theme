import { SiteSettings } from './SiteSettings'
import React, { Component, createContext } from 'react'

interface SiteContextProviderProps {
  siteSettings: SiteSettings
}

const initialState: SiteContextProviderProps = {
  siteSettings: { siteName: '' },
}

export const { Provider, Consumer: SiteContextConsumer } = createContext<SiteContextProviderProps>(initialState)

export class SiteContextProvider extends Component<SiteContextProviderProps, any> {
  state = { ...initialState }

  constructor(props: SiteContextProviderProps) {
    super(props)
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}
