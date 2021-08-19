// import original module declarations
import 'styled-components'
import { ThemeInterface } from './types'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeInterface {
  }
}
