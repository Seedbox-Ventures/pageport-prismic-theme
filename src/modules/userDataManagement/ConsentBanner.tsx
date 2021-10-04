import React, { useState } from 'react'
import styled from 'styled-components'
import { DataSink } from './types'
import { StyleHelper, ThemeButtonType, ThemeColorType, ThemeTextType } from '../../theme'
import { Overlay } from '../overlay/Overlay'
import Link from '../basic/Link'
import Button from '../basic/Button'
import { Section } from '../page'
import DataProtectionPanel from './DataProtectionPanel'

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
  backgroundColor: ThemeColorType
  buttonType: ThemeButtonType
  textType: ThemeTextType
  isOpen: boolean
  dataSinks?: Array<DataSink>
  acceptAll: () => void
  rejectAll: () => void
}

const ConsentBanner: React.FC<ConsentBannerProps> = ({
  dataSinks,
  isOpen,
  backgroundColor,
  buttonType,
  textType,
  acceptAll,
  rejectAll,
  children,
}) => {
  const [displayDPSettings, setDisplayDPSettings] = useState(false)

  return (
    <>
      {!!dataSinks?.length && isOpen && (
        <Overlay isOpen={isOpen} open={() => void 0} close={() => void 0} backdropBackground={'rgba(0,0,0,0.65)'}>
          <StyledConsentBanner className="consentBanner" textType={textType}>
            {!displayDPSettings && (
              <Section
                as={'div'}
                className="consentBanner__container"
                backgroundColor={backgroundColor}
                customContainerStyle={{
                  display: 'grid',
                  'column-gap': '1rem',
                  'row-gap': '1rem',
                  'grid-template-columns': 'auto|auto 200px|680px auto',
                }}
              >
                <div className="consentBanner__explanation">{children}</div>
                <div className="consentBanner__links">
                  <div className="consentBanner__linkWrapper">
                    <Link
                      onClick={() => {
                        setDisplayDPSettings(true)
                      }}
                    >
                      Individuelle Datenschutzeinstellungen
                    </Link>
                  </div>
                  <div className="consentBanner__linkWrapper">
                    <Link onClick={rejectAll}>Nur essenzielle Cookies akzeptieren</Link>
                  </div>
                </div>
                <div className="consentBanner__buttons">
                  <Button type={buttonType} onClick={acceptAll}>
                    Alle akzeptieren
                  </Button>
                </div>
              </Section>
            )}
            {displayDPSettings && <DataProtectionPanel />}
          </StyledConsentBanner>
        </Overlay>
      )}
    </>
  )
}

export default ConsentBanner
