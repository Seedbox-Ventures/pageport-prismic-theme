import React, { PureComponent } from 'react'
import _ from 'lodash'
import { Section } from '../page'
import { ThemeButtonType, ThemeColorType } from '../../theme'
import styled from 'styled-components'
import { Button } from '../basic/Button'
import { DataSink, DataSinkCategory } from './types'
import { RootState } from '../../state/store'
import { acceptAll, rejectAll, selectDataSinks } from './dataProtectionSlice'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { connect } from 'react-redux'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Switch,
  Table,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'

export interface DataProtectionSettingsProps {
  background?: ThemeColorType
  dataSinks: Array<DataSink>
}

export interface DataProtectionSettingsState {
  openPanel?: string | null
}

const StyledDataProtectionPanel = styled.div<{ tableBackground: ThemeColorType }>(
  ({ tableBackground, theme }) => `
  h2,
  p {
    margin: 0 0 1.25rem 0;
  }

  button {
    margin: 0.5rem;
  }
  
  table {
    margin: 1rem 0;
    background: ${theme.getColorValueByType(tableBackground)};
  }

  .dataProtectionPanel {
    &__buttons {
      margin: 0 -0.5rem;
    }

    &__settings {
      margin: 2rem 0;
    }
  }
`,
)

const StyledAccordionHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

interface DataProtectionAccordionItemProps {
  category: string
  dataSinks: Array<DataSink>
}

class DataProtectionPanel extends PureComponent<DataProtectionSettingsProps, DataProtectionSettingsState> {
  constructor(props: DataProtectionSettingsProps) {
    super(props)

    this.state = {
      openPanel: null,
    }
  }

  toggleAccordion = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    this.setState({ openPanel: isExpanded ? panel : null })
  }

  renderDataProtectionAccordion(dataSinks: Array<DataSink>) {
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

  renderAccordionItem(accordionItemProps: DataProtectionAccordionItemProps) {
    const { openPanel } = this.state
    const { category } = accordionItemProps
    const panelName = `panel-${category}`
    return (
      <Accordion expanded={openPanel === panelName} onChange={this.toggleAccordion(panelName)}>
        {this.renderAccordionItemHeader(category)}
        {this.renderAccordionItemContent(accordionItemProps)}
      </Accordion>
    )
  }

  renderAccordionItemHeader(category: string) {
    return (
      <AccordionSummary>
        <StyledAccordionHeader>
          <h3>{category}</h3> <Switch />
        </StyledAccordionHeader>
      </AccordionSummary>
    )
  }

  renderAccordionItemContent({ dataSinks }: DataProtectionAccordionItemProps) {
    if (!dataSinks.length) {
      return null
    }
    return (
      <AccordionDetails>
        {_.map(dataSinks, ({ type, tagId = '%', provider, purpose, category }) => {
          return (
            <TableContainer key={`${type}-${tagId}`}>
              <Table>
                {type && (
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>{type}</TableCell>
                  </TableRow>
                )}
                {category !== DataSinkCategory.Essential && (
                  <TableRow>
                    <TableCell>Akzeptieren</TableCell>
                    <TableCell>
                      <Switch />
                    </TableCell>
                  </TableRow>
                )}
                {provider && (
                  <TableRow>
                    <TableCell>Anbieter</TableCell>
                    <TableCell>{provider}</TableCell>
                  </TableRow>
                )}
                {purpose && (
                  <TableRow>
                    <TableCell>Zweck</TableCell>
                    <TableCell>{purpose}</TableCell>
                  </TableRow>
                )}
              </Table>
            </TableContainer>
          )
        })}
      </AccordionDetails>
    )
  }

  render = () => {
    const { background = ThemeColorType.BackgroundDefault, dataSinks } = this.props
    const tableBackground =
      background === ThemeColorType.BackgroundDefault
        ? ThemeColorType.BackgroundAlternative
        : ThemeColorType.BackgroundDefault
    return (
      <Section backgroundColor={background}>
        <StyledDataProtectionPanel className="dataProtectionPanel" tableBackground={tableBackground}>
          <h2>Datenschutz&shy;einstellungen</h2>
          <p>
            Hier finden Sie eine Übersicht über alle verwendeten Cookies. Sie können Ihre Einwilligung zu ganzen
            Kategorien geben oder sich weitere Informationen anzeigen lassen und so nur bestimmte Cookies auswählen.
          </p>
          <div className="dataProtectionPanel__buttons">
            <Button type={ThemeButtonType.Success}>Alle akzeptieren</Button>
            <Button type={ThemeButtonType.Default}>Speichern</Button>
          </div>
          <div className="dataProtectionPanel__settings">{this.renderDataProtectionAccordion(dataSinks)}</div>
        </StyledDataProtectionPanel>
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

export default connect(mapStateToProps, mapDispatchToProps)(DataProtectionPanel)
