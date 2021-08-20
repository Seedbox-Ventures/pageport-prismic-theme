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
  BackgroundEmphasize = 'Background Emphasize'
}

export type ThemeBackgroundColor =
  ThemeColorType.BackgroundDefault
  | ThemeColorType.BackgroundAlternative
  | ThemeColorType.BackgroundAlternative

export type ThemeTextColor = ThemeColorType.DarkText | ThemeColorType.LightText

export interface ThemeColor {
  colorType: ThemeColorType
  value: `#${string}`
}

export enum ThemeFontFamilyType {
  Primary = 'Primary',
  Secondary = 'Secondary'
}

export enum ThemeTextType {
  StandardText = 'Standard Text',
  PageTitle = 'Page Title',
  SectionTitle = 'Section Title',
  SubTitle = 'Sub Title',
  SmallTitle = 'Small Title',
  SmallText = 'Small Text',
  BigText = 'Big Text',
  Footnote = 'Footnote',
  Button = 'Button'
}

export interface ThemeType {
  fontFamily: ThemeFontFamilyType
  fontSize: string
  letterSpacing: string
  lineHeight: string
  textType: ThemeTextType
}

export enum ThemeButtonType {
  Default = 'Default',
  Submit = 'Submit',
  Success = 'Success',
  Danger = 'Danger',
  Cancel = 'Cancel',
}

export enum ThemeButtonHoverEffectType {
  None = "None",
  ChangeBackground = "Change Background",
  ChangeBoxShadow = "Change Box Shadow",
  DarkenLighten = "Darken / Lighten",
}

export interface ThemeButtonConfig {
  buttonType: ThemeButtonType
  color: ThemeColorType,
  fillBackground: boolean
  hoverEffect: ThemeButtonHoverEffectType
}

export interface ThemeValues {
  colors: Array<ThemeColor>
  contentPadding: string
  contentMaxWidth: string
  primaryFontFamily: string
  primaryFontImportLink: FilledLinkToWebField
  secondaryFontFamily: string
  secondaryFontImportLink: FilledLinkToWebField
  typeDefinitions: Array<ThemeType>
  buttonPadding: string
  buttonBorderRadius: string
  buttonBorderWidth: string
  buttonBoxShadow: string
  buttons: Array<ThemeButtonConfig>
}

export interface ThemePrismicData {
  colors?: Array<{ color_type: string, value: string }>
  content_padding?: string
  content_max_width?: string
  primary_font_import_link?: { url: string }
  primary_font_family?: string,
  secondary_font_import_link?: { url: string }
  secondary_font_family?: string,
  icon?: {
    alt?: string | null
    url: string
  }
  logo?: {
    alt?: string | null
  }
  'type_definitions': Array<{
    'font_family': string
    'font_size': string
    'letter_spacing': string
    'line_height': string
    'text_type': string
  }>,
  button_padding?: string
  button_border_radius?: string
  button_border_width?: string
  button_box_shadow?: string
  buttons?: Array<{
    'button_type': string
    'color': string
    'fill_background': boolean
    'hover_effect': string
  }>
}

export interface ThemeInterface {
  values: ThemeValues
  //Function Section
  getColorValueByType: (colorType: ThemeColorType) => `#${string}`
  getFontFamily: (fontFamilyType: ThemeFontFamilyType) => string
  getTextColorValueByBackground: (background: ThemeBackgroundColor) => `#${string}`
  getTextColorValueByBackgroundValue: (background: `#${string}`) => `#${string}`
  getType: (textType: ThemeTextType) => ThemeType | undefined
  getStandardType: () => ThemeType
  renderTextTypeCss: (themeTextType: ThemeTextType) => string
  renderTypeCss: (themeTextType: ThemeType) => string
  getButtonConfigByType: (buttonType: ThemeButtonType) => ThemeButtonConfig
}

