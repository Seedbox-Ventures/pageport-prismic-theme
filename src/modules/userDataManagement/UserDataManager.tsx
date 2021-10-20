import React from 'react'
import { RootState } from '../../state/store'
import { acceptAll, rejectAll, selectConsentBannerSettings, selectConsentData, selectDataSinks } from './userDataSlice'
import _ from 'lodash'
import { ConsentBannerSettings, DataProtectionConsentData, DataSink, DataSinkCategory } from './types'
import ConsentBanner, { ConsentBannerProps } from './ConsentBanner'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import trackingCodes from './trackingCodes'
import { connect } from 'react-redux'

export interface UserDataManagerProps {
  acceptAll: () => void
  rejectAll: () => void
  dataSinks: Array<DataSink>
  consentBannerSettings: ConsentBannerSettings
  consentData: DataProtectionConsentData
}

class UserDataManager extends React.PureComponent<UserDataManagerProps> {
  scriptTags: Record<string, HTMLAnchorElement> = {}

  get consentBannerProps(): ConsentBannerProps {
    const { acceptAll, rejectAll, dataSinks } = this.props
    const { backgroundColor, buttonType, textType } = this.props.consentBannerSettings
    return { backgroundColor, buttonType, textType, isOpen: this.displayConsentBanner, dataSinks, acceptAll, rejectAll }
  }

  get displayConsentBanner() {
    const { dataSinks } = this.props
    return !!_.find(dataSinks, { accepted: undefined })
  }

  renderTrackerCodes(consentData: DataProtectionConsentData) {
    return _.map(consentData, ({ category, accepted, type, tagId }) => {
      if (!accepted || category === DataSinkCategory.Essential) {
        return null
      }
      const TrackingCode = trackingCodes[type]
      return TrackingCode ? <TrackingCode key={tagId} trackingId={tagId} /> : null
    })
  }

  render = () => {
    const { consentData } = this.props
    return (
      <>
        {this.displayConsentBanner && <ConsentBanner {...this.consentBannerProps} />}
        {this.renderTrackerCodes(consentData)}
      </>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  dataSinks: selectDataSinks(state),
  consentBannerSettings: selectConsentBannerSettings(state),
  consentData: selectConsentData(state),
})

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, null, AnyAction>) => ({
  acceptAll: () => {
    dispatch(acceptAll())
  },
  rejectAll: () => {
    dispatch(rejectAll())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDataManager)
