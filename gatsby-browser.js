// gatsby-ssr.js and gatsby-browser.js files

import * as React from 'react'
import { PrismicPreviewProvider } from 'gatsby-plugin-prismic-previews'

import 'gatsby-plugin-prismic-previews/dist/styles.css'

import './src/theme/reset.css'
import { Provider } from 'react-redux'
import { store } from './src/state/store'
import UserDataManager from './src/modules/userDataManagement/UserDataManager'

export const wrapRootElement = ({ element }) => (
  <Provider store={store}>
    <PrismicPreviewProvider>
      {element}
      <UserDataManager />
    </PrismicPreviewProvider>
  </Provider>
)
