import React from 'react'
import { RootState } from '../../state/store'
import { acceptAll, rejectAll, selectConsentBannerSettings, selectConsentData, selectDataSinks } from './userDataSlice'
import { connect } from 'react-redux'
import _ from 'lodash'
import { ConsentBannerSettings, DataProtectionConsentData, DataSink, DataSinkCategory } from './types'
import ConsentBanner, { ConsentBannerProps } from './ConsentBanner'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { createPortal } from 'react-dom'
import trackingCodes from './trackingCodes'

export interface UserDataManagerProps {
  acceptAll: () => void
  rejectAll: () => void
  dataSinks: Array<DataSink>
  consentBannerSettings: ConsentBannerSettings
  consentData: DataProtectionConsentData
}

class UserDataManager extends React.PureComponent<UserDataManagerProps> {
  headEl?: HTMLHeadElement
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

  componentDidMount = () => {
    this.headEl = document.head
  }

  renderTrackerCodes(consentData: DataProtectionConsentData) {
    return _.map(consentData, ({ category, accepted, type, tagId }) => {
      if (!accepted || category === DataSinkCategory.Essential) {
        return null
      }
      const TrackingCode = trackingCodes[type]
      return TrackingCode ? <TrackingCode trackingId={tagId} /> : null
    })
  }

  render = () => {
    const { consentData } = this.props
    return (
      <>
        {this.displayConsentBanner && <ConsentBanner {...this.consentBannerProps} />}
        {!!this.headEl && createPortal(this.renderTrackerCodes(consentData), this.headEl)}
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
