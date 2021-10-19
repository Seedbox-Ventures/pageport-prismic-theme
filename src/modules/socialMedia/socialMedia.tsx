import { SocialMediaPlatform } from './type'
import {
  Facebook,
  Instagram,
  LinkedIn,
  Pinterest,
  Reddit,
  SvgIconComponent,
  Telegram,
  Twitter,
  WhatsApp,
  YouTube,
} from '@mui/icons-material'

const IconMap: Record<SocialMediaPlatform, SvgIconComponent> = {
  [SocialMediaPlatform.Facebook]: Facebook,
  [SocialMediaPlatform.Instagram]: Instagram,
  [SocialMediaPlatform.LinkedIn]: LinkedIn,
  [SocialMediaPlatform.Pinterest]: Pinterest,
  [SocialMediaPlatform.Reddit]: Reddit,
  [SocialMediaPlatform.Telegram]: Telegram,
  [SocialMediaPlatform.Twitter]: Twitter,
  [SocialMediaPlatform.WhatsApp]: WhatsApp,
  [SocialMediaPlatform.YouTube]: YouTube,
}

export function getIcon(socialMediaPlatform: SocialMediaPlatform) {
  return IconMap[socialMediaPlatform]
}
