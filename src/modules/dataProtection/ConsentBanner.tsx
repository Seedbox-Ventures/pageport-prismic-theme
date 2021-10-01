import React from 'react'
import styled from 'styled-components'
import { Overlay } from '../overlay/Overlay'
import { Section } from '../page'
import { Button } from '../basic/Button'
import { DataSink } from './types'
import { acceptAll, rejectAll, selectBannerState, selectDataSinks } from './dataProtectionSlice'
import { StyleHelper, ThemeButtonType, ThemeColorType, ThemeTextType } from '../../theme'
import { Link } from '../basic/Link'
import DataProtectionSettingsPanel from './DataProtectionPanel'
import { connect } from 'react-redux'
import { RootState } from '../../state/store'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'

const StyledConsentBanner = styled.div<{ textType?: ThemeTextType }>(({ textType, theme }) => {
  return `
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: auto;
    ${textType ? theme.renderTextTypeCss(textType) : ''} 
    
    .consentBanner {
      &__links {
        margin: 0 -.5em;
        ${StyleHelper.renderCssFromObject({
          'grid-column-start': '1',
          'grid-column-end': '2',
          'grid-row-start': '2',
          'grid-row-end': '3',
          'text-align': 'center|left',
        })}
      }
      
      &__linkWrapper {
        display: inline-block;
        margin: .5em;
      }
      
      &__explanation {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 1:
        grid-row-end: 2;
      }
      
      &__buttons {
        ${StyleHelper.renderCssFromObject({
          display: 'flex',
          'grid-column-start': '1|2',
          'grid-column-end': '2|3',
          'grid-row-start': '3|1',
          'grid-row-end': '4|3',
          'justify-self': 'center',
          'justify-content': 'center',
          'align-items': 'center',
        })}
      }
    }
  `
})

export interface ConsentBannerProps {
  bannerSettings?: {
    backgroundColor: ThemeColorType
    buttonType: ThemeButtonType
    explanationText: string
    textType: ThemeTextType
    isOpen: boolean
  }
  dataSinks?: Array<DataSink>
  acceptAllFunc?: () => void
  rejectAllFunc?: () => void
}

export interface ConsentBannerInternalState {
  doDisplayDataProtectionSettings: boolean
}

class ConsentBanner extends React.PureComponent<ConsentBannerProps, ConsentBannerInternalState> {
  displayDataProtectionSettings = () => {
    this.setState({ doDisplayDataProtectionSettings: true })
  }
  hideDataProtectionSettings = () => {
    this.setState({ doDisplayDataProtectionSettings: false })
  }

  constructor(props: ConsentBannerProps) {
    super(props)

    this.state = {
      doDisplayDataProtectionSettings: false,
    }
  }

  render = () => {
    const {
      bannerSettings: { isOpen, backgroundColor, buttonType, explanationText, textType } = {
        isOpen: false,
        backgroundColor: ThemeColorType.BackgroundDefault,
        buttonType: ThemeButtonType.Default,
        explanationText: '',
        textType: ThemeTextType.StandardText,
      },
      dataSinks,
      acceptAllFunc,
      rejectAllFunc,
    } = this.props
    const { doDisplayDataProtectionSettings } = this.state

    return (
      <>
        {!!dataSinks?.length && isOpen && (
          <Overlay isOpen={isOpen} open={() => void 0} close={() => void 0} backdropBackground={'rgba(0,0,0,0.65)'}>
            <StyledConsentBanner className="consentBanner" textType={textType}>
              {!doDisplayDataProtectionSettings && (
                <Section
                  className="consentBanner__container"
                  as={'div'}
                  backgroundColor={backgroundColor}
                  customContainerStyle={{
                    display: 'grid',
                    'column-gap': '1rem',
                    'row-gap': '1rem',
                    'grid-template-columns': 'auto|auto 200px|680px auto',
                  }}
                >
                  <div className="consentBanner__explanation">
                    <p>{explanationText}</p>
                  </div>
                  <div className="consentBanner__links">
                    <div className="consentBanner__linkWrapper">
                      <Link onClick={this.displayDataProtectionSettings}>Individuelle Datenschutzeinstellungen</Link>
                    </div>
                    <div className="consentBanner__linkWrapper">
                      <Link onClick={rejectAllFunc}>Nur essenzielle Cookies akzeptieren</Link>
                    </div>
                  </div>
                  <div className="consentBanner__buttons">
                    <Button type={buttonType} onClick={acceptAllFunc}>
                      Alle akzeptieren
                    </Button>
                  </div>
                </Section>
              )}
              {doDisplayDataProtectionSettings && <DataProtectionSettingsPanel />}
            </StyledConsentBanner>
          </Overlay>
        )}
      </>
    )
  }
}

const mapStateToProps = (state: RootState): ConsentBannerProps => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(ConsentBanner)
