import React from 'react'
import { Overlay } from '../overlay/Overlay'
import styled from 'styled-components'
import { Section } from '../page'
import { ThemeButtonType, ThemeColorType } from '../../theme'
import { Button } from '../basic/Button'
import { ConsentBannerState, DataSink } from './types'
import { useAppSelector } from '../../state/hooks'
import { selectBannerState, selectDataSinks } from './dataProtectionSlice'

interface ConsentBannerProps {}

const StyledConsentBanner = styled.div`
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: auto;
`

const StyledLink = styled.a`
  cursor: pointer;
`
export const ConsentBanner: React.FC<ConsentBannerProps> = () => {
  const { isOpen }: ConsentBannerState = useAppSelector(selectBannerState)
  const dataSinks: Array<DataSink> = useAppSelector(selectDataSinks)
  return (
    <>
      {!!dataSinks?.length && (
        <Overlay isOpen={isOpen} open={() => void 0} close={() => void 0} backdropBackground={'rgba(0,0,0,0.65)'}>
          <StyledConsentBanner className="consentBanner">
            <Section
              as={'div'}
              backgroundColor={ThemeColorType.Primary}
              customContainerStyle={{ 'flex-direction': 'row' }}
            >
              <div>
                Wir nutzen Cookies auf unserer Website. Einige von ihnen sind essenziell, während andere uns helfen,
                diese Website und Ihre Erfahrung zu verbessern.
                <StyledLink>Nur essenzielle Cookies akzeptieren</StyledLink>
                <StyledLink>Individuelle Datenschutzeinstellungen</StyledLink>
              </div>
              <div>
                <Button type={ThemeButtonType.Secondary}>Alle akzeptieren</Button>
              </div>
            </Section>
          </StyledConsentBanner>
        </Overlay>
      )}
    </>
  )
}
