import * as React from 'react'

import { Header } from './Header'
import { Footer } from './Footer'
import './../styles/reset.css'
import './../styles/common.css'
import './../styles/style.css'

export const Layout = ({ isHomepage, children, navigation }) => (
  <>
    <script async defer src="https://static.cdn.prismic.io/prismic.js?new=true&repo=pageport-playground"></script>
    <Header isHomepage={isHomepage} navigation={navigation} />
    {children}
    <Footer />
  </>
)
