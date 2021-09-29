import React from 'react'
import styled from 'styled-components'
import { Overlay } from '../overlay/Overlay'
import { Section } from '../page'
import { Button } from '../basic/Button'
import { ConsentBannerState, DataSink } from './types'
import { useAppDispatch, useAppSelector } from '../../state/hooks'
import { acceptAll, selectBannerState, selectDataSinks } from './dataProtectionSlice'
import { ThemeTextType } from '../../theme'
import { Link } from '../basic/Link'

interface ConsentBannerProps {}

const StyledConsentBanner = styled.div<{ textType?: ThemeTextType }>(({ textType, theme }) => {
  return `
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: auto;
    ${textType ? theme.renderTextTypeCss(textType) : ''} 
  `
})

export const ConsentBanner: React.FC<ConsentBannerProps> = () => {
  const { isOpen, backgroundColor, buttonType, explanationText, textType }: ConsentBannerState =
    useAppSelector(selectBannerState)
  const dataSinks: Array<DataSink> = useAppSelector(selectDataSinks)
  const dispatch = useAppDispatch()
  const acceptAllFunc = () => {
    dispatch(acceptAll())
  }

  return (
    <>
      {!!dataSinks?.length && (
        <Overlay isOpen={isOpen} open={() => void 0} close={() => void 0} backdropBackground={'rgba(0,0,0,0.65)'}>
          <StyledConsentBanner className="consentBanner" textType={textType}>
            <Section
              className="consentBanner__container"
              as={'div'}
              backgroundColor={backgroundColor}
              customContainerStyle={{
                display: 'grid',
                'column-gap': '1rem',
                'row-gap': '1rem',
              }}
            >
              <div className="consentBanner_explanation">
                <p>{explanationText}</p>
              </div>
              <div className="consentBanner_links">
                <Link>Nur essenzielle Cookies akzeptieren</Link>
                <Link>Individuelle Datenschutzeinstellungen</Link>
              </div>
              <div className="consentBanner__col-2">
                <Button type={buttonType} onClick={acceptAllFunc}>
                  Alle akzeptieren
                </Button>
              </div>
            </Section>
          </StyledConsentBanner>
        </Overlay>
      )}
    </>
  )
}
