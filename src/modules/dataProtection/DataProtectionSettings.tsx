import React, { PureComponent, ReactElement } from 'react'
import _ from 'lodash'
import { Section } from '../page'
import { ThemeButtonType, ThemeColorType } from '../../theme'
import styled from 'styled-components'
import { Button } from '../basic/Button'
import { DataSink } from './types'
import Accordion, { AccordionItem, AccordionItemProps } from '../basic/Accordion/Accordion'
import { RootState } from '../../state/store'
import { acceptAll, rejectAll, selectDataSinks } from './dataProtectionSlice'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { connect } from 'react-redux'

export interface DataProtectionSettingsProps {
  backgroundColor?: ThemeColorType
  dataSinks: Array<DataSink>
}

export interface DataProtectionSettingsState {}

const StyledDataProtectionSettings = styled.div``

interface DataProtectionAccordionItemProps {
  category: string
  dataSinks: Array<DataSink>
}

class DataProtectionSettings extends PureComponent<DataProtectionSettingsProps, DataProtectionSettingsState> {
  extractDataProtectionSectionsFromDataSinks(
    dataSinks: Array<DataSink>,
  ): Array<ReactElement<AccordionItemProps> | undefined> {
    const groupedDataSinks = _.groupBy(dataSinks, 'category')

    return _.map(groupedDataSinks, (groupedDataSinks) =>
      !groupedDataSinks.length
        ? undefined
        : this.renderAccordionItem({
            dataSinks: groupedDataSinks,
            category: groupedDataSinks[0].category,
          }),
    )
  }

  renderAccordionItem(
    accordionItemProps: DataProtectionAccordionItemProps,
  ): ReactElement<AccordionItemProps> | undefined {
    const { category } = accordionItemProps
    return (
      <AccordionItem key={category} header={this.renderAccordionItemHeader}>
        {this.renderAccordionItemContent()}
      </AccordionItem>
    )
  }

  renderAccordionItemHeader(category: string) {
    return <h2>{category}</h2>
  }

  renderAccordionItemContent() {
    return 'NEW ITEM YEAH'
  }

  render = () => {
    const { backgroundColor = ThemeColorType.BackgroundDefault, dataSinks } = this.props
    return (
      <Section backgroundColor={backgroundColor}>
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
            <Accordion>{this.extractDataProtectionSectionsFromDataSinks(dataSinks)}</Accordion>
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

export default connect(mapStateToProps, mapDispatchToProps)(DataProtectionSettings)
