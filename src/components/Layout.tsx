import * as React from 'react'

import { Header } from './Header'
import { Footer } from './Footer'

export interface LayoutProps {
  children: React.ReactNode | undefined
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
)
