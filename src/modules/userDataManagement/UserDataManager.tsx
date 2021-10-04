import React from 'react'
import { RootState } from '../../state/store'
import { acceptAll, rejectAll, selectBannerState, selectDataSinks } from './dataProtectionSlice'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { connect } from 'react-redux'

export interface TrackingManagerProps {}

class TrackingManager extends React.PureComponent<TrackingManagerProps> {
  render() {
    return <></>
  }
}

const mapStateToProps = (state: RootState) => ({
  bannerSettings: selectBannerState(state),
  dataSinks: selectDataSinks(state),
})

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, null, AnyAction>) => ({
  acceptAllFunc: () => {
    dispatch(acceptAll())
  },
  rejectAllFunc: () => {
    dispatch(rejectAll())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(TrackingManager)
