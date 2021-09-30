import React, { PureComponent, ReactElement } from 'react'
import _ from 'lodash'
import { Section } from '../page'
import { ThemeButtonType, ThemeColorType } from '../../theme'
import styled from 'styled-components'
import { Button } from '../basic/Button'
import { DataSink, DataSinkCategory } from './types'
import Accordion, { AccordionItem, AccordionItemProps } from '../basic/Accordion/Accordion'
import { RootState } from '../../state/store'
import { acceptAll, rejectAll, selectDataSinks } from './dataProtectionSlice'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { connect } from 'react-redux'

export interface DataProtectionSettingsProps {
  background?: ThemeColorType
  dataSinks: Array<DataSink>
}

export interface DataProtectionSettingsState {}

const StyledDataProtectionSettings = styled.div``

const StyledAccordionItemHeader = styled.div``

const StyledAccordionItemWrapper = styled.div<{ background: ThemeColorType }>(
  ({ background, theme }) => `
  background: ${theme.getColorValueByType(background)};
`,
)

interface DataProtectionAccordionItemProps {
  category: string
  dataSinks: Array<DataSink>
  background: ThemeColorType
}

class DataProtectionSettingsPanel extends PureComponent<DataProtectionSettingsProps, DataProtectionSettingsState> {
  extractDataProtectionSectionsFromDataSinks(
    dataSinks: Array<DataSink>,
    background: ThemeColorType,
  ): Array<ReactElement<AccordionItemProps> | undefined> {
    const groupedDataSinks = _.groupBy(dataSinks, 'category')

    return _.map(groupedDataSinks, (groupedDataSinks) =>
      !groupedDataSinks.length
        ? undefined
        : this.renderAccordionItem({
            dataSinks: groupedDataSinks,
            category: groupedDataSinks[0].category,
            background,
          }),
    )
  }

  renderAccordionItem(
    accordionItemProps: DataProtectionAccordionItemProps,
  ): ReactElement<AccordionItemProps> | undefined {
    const { category, background } = accordionItemProps
    return (
      <StyledAccordionItemWrapper background={background}>
        <AccordionItem key={category} id={category} header={this.renderAccordionItemHeader(category)}>
          {this.renderAccordionItemContent(accordionItemProps)}
        </AccordionItem>
      </StyledAccordionItemWrapper>
    )
  }

  renderAccordionItemHeader(category: string) {
    return (
      <StyledAccordionItemHeader>
        <h2>{category}</h2>
      </StyledAccordionItemHeader>
    )
  }

  renderAccordionItemContent({ dataSinks }: DataProtectionAccordionItemProps) {
    if (!dataSinks.length) {
      return null
    }
    return (
      <div>
        {_.map(dataSinks, ({ type, tagId = '%', provider, purpose, category }) => {
          return (
            <div key={`${type}-${tagId}`}>
              <table>
                <tbody>
                  {category !== DataSinkCategory.Essential && (
                    <tr>
                      <th>Akzeptieren</th>
                      <td>RENDER ACCEPT TOGGLE</td>
                    </tr>
                  )}
                  {type && (
                    <tr>
                      <th>Name</th>
                      <td>{type}</td>
                    </tr>
                  )}
                  {provider && (
                    <tr>
                      <th>Anbieter</th>
                      <td>{provider}</td>
                    </tr>
                  )}
                  {purpose && (
                    <tr>
                      <th>Zweck</th>
                      <td>{purpose}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )
        })}
      </div>
    )
  }

  render = () => {
    const { background = ThemeColorType.BackgroundDefault, dataSinks } = this.props
    const accordionBackground =
      background === ThemeColorType.BackgroundDefault
        ? ThemeColorType.BackgroundAlternative
        : ThemeColorType.BackgroundDefault
    return (
      <Section backgroundColor={background}>
        <StyledDataProtectionSettings>
          <h2>Datenschutzeinstellungen</h2>
          <p>
            Hier finden Sie eine Übersicht über alle verwendeten Cookies. Sie können Ihre Einwilligung zu ganzen
            Kategorien geben oder sich weitere Informationen anzeigen lassen und so nur bestimmte Cookies auswählen.
          </p>
          <div>
            <Button type={ThemeButtonType.Success}>Alle akzeptieren</Button>
            <Button type={ThemeButtonType.Default}>Speichern</Button>
          </div>
          <div>
            <Accordion>{this.extractDataProtectionSectionsFromDataSinks(dataSinks, accordionBackground)}</Accordion>
          </div>
        </StyledDataProtectionSettings>
      </Section>
    )
  }
}

const mapStateToProps = (state: RootState): DataProtectionSettingsProps => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(DataProtectionSettingsPanel)
