import _ from 'lodash'
import Cookies from 'js-cookie'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  DataProtectionConsentData,
  DataProtectionConsentItem,
  DataProtectionData,
  DataProtectionState,
  DataSink,
  TrackerData,
} from './types'
import { ThemeButtonType, ThemeColorType, ThemeTextType } from '../../theme'
import { AppThunk, RootState } from '../../state/store'
import PagePort from '../../utils/PagePort'

const dataProtectionCookieName = 'pageport_data-protection'

const initialState: DataProtectionState = {
  isInitialized: false,
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
    updateDataProtectionState: (state, action: PayloadAction<Partial<DataProtectionState>>) => {
      const { dataSinks: formerDataSinks, banner: formerBanner } = state
      const { dataSinks = formerDataSinks, banner = {} } = action.payload
      console.log('UPDATE BLA BLA', !!_.find(dataSinks, { accepted: undefined }))
      console.log('UPDATE BLA BLA DATA SINKS', dataSinks)
      return {
        isInitialized: true,
        dataSinks,
        banner: { ...formerBanner, ...banner, isOpen: !!_.find(dataSinks, { accepted: undefined }) },
      }
    },
  },
})

const { updateDataProtectionState } = dataProtectionSlice.actions

export const acceptAll = (): AppThunk => (dispatch, getState) => {
  const dataSinks = selectDataSinks(getState())
  dispatch(
    updateDataProtectionConsent(
      _.map(dataSinks, ({ type, tagId, category }) => ({
        type,
        tagId,
        accepted: true,
        category,
      })),
    ),
  )
}

export const rejectAll = (): AppThunk => (dispatch, getState) => {
  const dataSinks = selectDataSinks(getState())
  dispatch(
    updateDataProtectionConsent(
      _.map(dataSinks, ({ type, tagId, category }) => ({
        type,
        tagId,
        accepted: false,
        category,
      })),
    ),
  )
}

export const initializeDataProtection =
  (dataProtectionData: DataProtectionData): AppThunk =>
  (dispatch) => {
    const { trackers = [] } = dataProtectionData
    // @ts-ignore
    dataProtectionData.trackers = _.uniqBy(
      [...PagePort.config.dataProtection.trackers, ...(trackers as Array<TrackerData>)],
      // @ts-ignore
      ({ type, tag_id = '%' }) => `${type}-${tag_id}`,
    )

    const rawCookieData = Cookies.get(dataProtectionCookieName)
    let consentData: DataProtectionConsentData
    try {
      consentData = rawCookieData ? JSON.parse(rawCookieData) : []
    } catch (e) {
      consentData = []
    }
    const extractedStatePartial = mapConsentDataToState(consentData, mapDataToState(dataProtectionData))
    // const dataProtectionCookieData = Cookies.get('dataProtection')
    dispatch(updateDataProtectionState({ isInitialized: true, ...extractedStatePartial }))
  }

export const updateDataProtectionConsent =
  (consentData: DataProtectionConsentData): AppThunk =>
  (dispatch, getState) => {
    Cookies.set(dataProtectionCookieName, JSON.stringify(consentData))
    const dataSinks = selectDataSinks(getState())
    const updatePartial = {
      dataSinks: _.map(dataSinks, (dataSink) => {
        const { type, tagId, category } = dataSink
        const { accepted } = _.find(consentData, { type, tagId, category }) ?? {}
        return { ...dataSink, accepted }
      }),
    }
    dispatch(updateDataProtectionState(updatePartial))
  }

export const selectBannerState = (state: RootState) => state.dataProtection.banner
export const selectDataSinks = (state: RootState) => state.dataProtection.dataSinks
export const selectConsentData = (state: RootState) => extractConsentDataFromDataSinks(state.dataProtection.dataSinks)

const mapDataToState = (data: DataProtectionData): Partial<DataProtectionState> => {
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

const mapConsentDataToState = (
  consentData: DataProtectionConsentData,
  statePartial: Partial<DataProtectionState>,
): Partial<DataProtectionState> => {
  if (!statePartial.dataSinks) {
    return {}
  }
  return {
    ...statePartial,
    dataSinks: _.map(statePartial.dataSinks, (dataSink) => {
      const { type, tagId, accepted: oldAccepted } = dataSink
      const { accepted = oldAccepted } = (_.find(consentData, ({ type: itemType, tagId: itemTagId }) => {
        return type === itemType && (typeof tagId === 'undefined' || tagId == itemTagId)
      }) ?? {}) as DataProtectionConsentItem
      return { ...dataSink, accepted }
    }),
  }
}

export const extractConsentDataFromDataSinks = (dataSinks: Array<DataSink>): DataProtectionConsentData => {
  return _.map(dataSinks, ({ type, tagId, accepted, category }) => ({ type, tagId, accepted, category }))
}

export default dataProtectionSlice.reducer
