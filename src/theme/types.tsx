import * as CSS from 'csstype'
import { FilledLinkToWebField } from '@prismicio/types'

export enum ThemeColorType {
  Primary = 'Primary',
  Accent = 'Accent',
  Info = 'Info',
  Warn = 'Warn',
  Danger = 'Danger',
  Success = 'Success',
  LightText = 'Light Text',
  DarkText = 'Dark Text',
  BackgroundDefault = 'Background Default',
  BackgroundAlternative = 'Background Alternative',
  BackgroundEmphasize = 'Background Emphasize',
  Transparent = 'Transparent',
}

export type ThemeBackgroundColor =
  | ThemeColorType.BackgroundDefault
  | ThemeColorType.BackgroundAlternative
  | ThemeColorType.BackgroundEmphasize

export type ThemeTextColor = ThemeColorType.DarkText | ThemeColorType.LightText

export interface ThemeColor {
  colorType: ThemeColorType
  value: `#${string}`
}

export enum ThemeFontFamilyType {
  Primary = 'Primary',
  Secondary = 'Secondary',
}

export enum ThemeTextType {
  StandardText = 'Standard Text',
  PageTitle = 'Page Title',
  SectionTitle = 'Section Title',
  SubTitle = 'Sub Title',
  SmallTitle = 'Small Title',
  SmallText = 'Small Text',
  BigText = 'Big Text',
  Header = 'Header',
  Footer = 'Footer',
  Footnote = 'Footnote',
  Button = 'Button',
}

export enum ThemeLinkHoverEffekt {
  None = 'None',
  DarkenLighten = 'Darken / Lighten',
  Underline = 'Underline',
}

export interface ThemeTypeStyle {
  fontFamily: ThemeFontFamilyType
  fontSize: string
  letterSpacing: string
  lineHeight: string
  fontWeight: string
  fontStyle: string
  textType: ThemeTextType
  linkColor: ThemeColorType
  linkHoverEffekt: ThemeLinkHoverEffekt
}

export interface ThemeLinkConfig {
  fontFamily: ThemeFontFamilyType
  fontSize: CSS.Property.FontSize
  fontWeight: CSS.Property.FontWeight
  fontStyle: CSS.Property.FontStyle
  letterSpacing: CSS.Property.LetterSpacing
  lineHeight: CSS.Property.LineHeight
  color: ThemeColorType
  hoverEffekt: ThemeLinkHoverEffekt
}

export enum ThemeButtonType {
  Default = 'Default',
  Primary = 'Primary',
  Secondary = 'Secondary',
  Submit = 'Submit',
  Cancel = 'Cancel',
  Info = 'Info',
  Success = 'Success',
  Warn = 'Warn',
  Danger = 'Danger',
}

export enum ThemeButtonHoverEffectType {
  None = 'None',
  ChangeBackground = 'Change Background',
  ChangeBoxShadow = 'Change Box Shadow',
  DarkenLighten = 'Darken / Lighten',
}

export interface ThemeButtonConfig {
  buttonType: ThemeButtonType
  color: ThemeColorType
  fillBackground: boolean
  hoverEffect: ThemeButtonHoverEffectType
}

export interface ThemeProps {
  colors: Array<ThemeColor>
  contentPadding: string
  contentMaxWidth: string
  primaryFontFamily: string
  primaryFontImportLink: FilledLinkToWebField
  secondaryFontFamily: string
  secondaryFontImportLink: FilledLinkToWebField
  typeDefinitions: Array<ThemeTypeStyle>
  buttonPadding: string
  buttonBorderRadius: string
  buttonBorderWidth: string
  buttonBoxShadow: string
  buttons: Array<ThemeButtonConfig>
}

export interface ThemeData {
  colors?: Array<{ color_type: string; value: string }>
  content_padding?: string
  content_max_width?: string
  primary_font_import_link?: { url: string }
  primary_font_family?: string
  secondary_font_import_link?: { url: string }
  secondary_font_family?: string
  icon?: {
    alt?: string | null
    url: string
  }
  logo?: {
    alt?: string | null
  }
  type_definitions: Array<{
    font_family: string
    font_size: string
    letter_spacing: string
    line_height: string
    text_type: string
  }>
  button_padding?: string
  button_border_radius?: string
  button_border_width?: string
  button_box_shadow?: string
  buttons?: Array<{
    button_type: string
    color: string
    fill_background: boolean
    hover_effect: string
  }>
}

export interface ThemeInterface {
  props: ThemeProps
  //Function Section
  getColorValueByType: (colorType: ThemeColorType) => `#${string}`
  getFontFamily: (fontFamilyType: ThemeFontFamilyType) => string
  getTextColorValueByBackground: (background: ThemeColorType) => `#${string}`
  getTextColorValueByBackgroundValue: (background: `#${string}`) => `#${string}`
  getType: (textType: ThemeTextType) => ThemeTypeStyle | undefined
  getStandardType: () => ThemeTypeStyle
  renderTextTypeCss: (themeTextType: ThemeTextType) => string
  renderTypeCss: (themeTextType: ThemeTypeStyle) => string
  getButtonConfigByType: (buttonType: ThemeButtonType) => ThemeButtonConfig
}

