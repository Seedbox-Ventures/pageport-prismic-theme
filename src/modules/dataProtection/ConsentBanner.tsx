import React from 'react'
import styled from 'styled-components'
import { Overlay } from '../overlay/Overlay'
import { Section } from '../page'
import { Button } from '../basic/Button'
import { ConsentBannerState, DataSink } from './types'
import { useAppDispatch, useAppSelector } from '../../state/hooks'
import { acceptAll, selectBannerState, selectDataSinks } from './dataProtectionSlice'
import { StyleHelper, ThemeTextType } from '../../theme'
import { Link } from '../basic/Link'

interface ConsentBannerProps {}

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
                'grid-template-columns': 'auto|auto 200px|680px auto',
              }}
            >
              <div className="consentBanner__explanation">
                <p>{explanationText}</p>
              </div>
              <div className="consentBanner__links">
                <div className="consentBanner__linkWrapper">
                  <Link>Nur essenzielle Cookies akzeptieren</Link>
                </div>
                <div className="consentBanner__linkWrapper">
                  <Link>Individuelle Datenschutzeinstellungen</Link>
                </div>
              </div>
              <div className="consentBanner__buttons">
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
