import React from 'react'
import { RootState } from '../../state/store'
import { acceptAll, rejectAll, selectConsentBannerSettings, selectConsentData, selectDataSinks } from './userDataSlice'
import { connect } from 'react-redux'
import _ from 'lodash'
import { ConsentBannerSettings, DataProtectionConsentData, DataSink, DataSinkCategory } from './types'
import ConsentBanner, { ConsentBannerProps } from './ConsentBanner'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'

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

  componentDidUpdate() {
    this.setupScriptTags()
  }

  setupScriptTags() {
    const { consentData } = this.props
    const initializedTrackerKeys = Object.keys(this.scriptTags)
    const notInitializedTrackers = _.filter(consentData, ({category, accepted}) => {
      return accepted && category !== DataSinkCategory.Essential
    })
  }

  render() {
    const {} = this.props
    return <>{this.displayConsentBanner && <ConsentBanner {...this.consentBannerProps} />}</>
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
