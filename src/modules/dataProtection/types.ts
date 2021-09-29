import { ThemeButtonType, ThemeColorType, ThemeTextType } from '../../theme'

export enum DataSinkCategory {
  Essential = 'Essential',
  ExternalData = 'External Data',
  Marketing = 'Marketing',
  Statistics = 'Statistics',
}

export enum DataSinkType {
  FacebookPixel = 'Facebook Pixel',
  GoogleTagManager = 'Google Tag Manager',
  GoogleAnalytics = 'Google Analytics',
  Hotjar = 'Hotjar',
  LinkedInInsightTag = 'LinkedIn Insight Tag',
  VWO = 'VWO',
}

export interface DataSink {
  type: DataSinkType
  category: DataSinkCategory
  accepted?: boolean
  tagId: string
  provider?: string
  gdprLink?: string
  purpose?: string
  integrationCode?: string
}

export type DataProtectionConsentItem = {
  type: string
  tagId: string
  accepted?: boolean
}

export type DataProtectionConsentData = Array<DataProtectionConsentItem>

export interface DataProtectionData {
  trackers?: Array<{
    type: DataSinkType
    purpose: string
    category: DataSinkCategory
    provider: string
    tag_id: string
  }>
  banner_background_color?: ThemeColorType
  banner_button_type?: ThemeButtonType
  banner_explanation_text?: string
  banner_text_type?: ThemeTextType
}

export interface ConsentBannerState {
  backgroundColor: ThemeColorType
  buttonType: ThemeButtonType
  explanationText: string
  textType: ThemeTextType
  isOpen: boolean
}

export interface DataProtectionState {
  isInitialized: boolean
  dataSinks: Array<DataSink>
  banner: ConsentBannerState
}
