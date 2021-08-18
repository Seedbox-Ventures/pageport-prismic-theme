// import original module declarations
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    values: ThemeValues
    //Function Section

    getFontFamily: (fontFamilyType: ThemeFontFamilyType) => string
    getType: (textType: ThemeTextType) => ThemeType | undefined
    getStandardType: () => ThemeType
    renderTypeCss: (themeTextType: ThemeTextType) => string
  }
}
