import { ThemeButtonType, ThemeColorType, ThemeTextType } from '../../theme'

export enum DataSinkCategory {
  Essential = 'Essential',
  ExternalData = 'External Data',
  Marketing = 'Marketing',
  Statistics = 'Statistics',
}

export enum DataSinkType {
  FacebookPixel = 'Facebook Pixel',
  GoogleAnalytics = 'Google Analytics',
  GoogleTagManager = 'Google Tag Manager',
  Hotjar = 'Hotjar',
  LinkedInInsightTag = 'LinkedIn Insight Tag',
  PageportControl = 'pageport control',
  VWO = 'VWO',
}

export interface DataSink {
  type: DataSinkType
  category: DataSinkCategory
  accepted?: boolean
  tagId?: string
  provider?: string
  gdprLink?: string
  purpose?: string
}

export type DataProtectionConsentItem = {
  type: DataSinkType
  category: DataSinkCategory
  tagId?: string
  accepted?: boolean
}

export type DataProtectionConsentData = Array<DataProtectionConsentItem>

export interface TrackerData {
  type: DataSinkType
  purpose: string
  category: DataSinkCategory
  provider: string
  tag_id?: string
}

export interface UserDataSettingsData {
  trackers?: Array<TrackerData>
  banner_background_color?: ThemeColorType
  banner_button_type?: ThemeButtonType
  banner_explanation_text?: string
  banner_text_type?: ThemeTextType
}

export interface ConsentBannerSettings {
  backgroundColor: ThemeColorType
  buttonType: ThemeButtonType
  explanationText: string
  textType: ThemeTextType
}

export interface UserDataSettingsState {
  isInitialized: boolean
  dataSinks: Array<DataSink>
  banner: ConsentBannerSettings
}
