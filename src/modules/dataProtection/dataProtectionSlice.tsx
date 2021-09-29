import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DataProtectionData, DataProtectionState } from './types'
import _ from 'lodash'
import { ThemeButtonType, ThemeColorType, ThemeTextType } from '../../theme'
import { RootState } from '../../state/store'

const initialState: DataProtectionState = {
  dataSinks: [],
  banner: {
    backgroundColor: ThemeColorType.BackgroundDefault,
    buttonType: ThemeButtonType.Default,
    explanationText: '',
    textType: ThemeTextType.StandardText,
    isOpen: false,
  },
}

export const dataProtectionSlice = createSlice({
  name: 'dataProtection',
  initialState,
  reducers: {
    receiveDataProtectionData: (state, action: PayloadAction<DataProtectionData>) => {
      return { ...state, ...mapDataToState(action.payload) }
    },
  },
})

export const { receiveDataProtectionData } = dataProtectionSlice.actions

export const selectBannerState = (state: RootState) => state.dataProtection.banner
export const selectDataSinks = (state: RootState) => state.dataProtection.dataSinks

const mapDataToState = (data: DataProtectionData): DataProtectionState => {
  return {
    dataSinks: _.map(data.trackers, ({ type, category, tag_id, purpose, provider }) => {
      return { type, category, tagId: tag_id, purpose, provider }
    }),
    banner: {
      backgroundColor: data.banner_background_color ?? ThemeColorType.BackgroundDefault,
      buttonType: data.banner_button_type ?? ThemeButtonType.Default,
      explanationText: data.banner_explanation_text ?? '',
      textType: data.banner_text_type ?? ThemeTextType.StandardText,
      isOpen: false,
    },
  }
}

export default dataProtectionSlice.reducer
