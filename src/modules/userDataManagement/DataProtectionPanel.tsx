import React, { PureComponent } from 'react'
import _ from 'lodash'
import { ThemeButtonType, ThemeColorType } from '../../theme'
import styled from 'styled-components'
import Button from '../basic/Button'
import { DataProtectionConsentData, DataSink, DataSinkCategory } from './types'
import { RootState } from '../../state/store'
import {
  acceptAll,
  extractConsentDataFromDataSinks,
  selectDataSinks,
  updateDataProtectionConsent,
} from './userDataSlice'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { connect } from 'react-redux'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'
import Section from '../page/Section'

export interface DataProtectionSettingsProps {
  acceptAllFunc: () => void
  background?: ThemeColorType
  dataSinks: Array<DataSink>
  saveConsentData: (consentData: DataProtectionConsentData) => void
}

export interface DataProtectionSettingsState {
  openPanel?: string | null
  consentData: DataProtectionConsentData
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

    const { dataSinks } = props

    this.state = {
      openPanel: null,
      consentData: extractConsentDataFromDataSinks(dataSinks),
    }
  }

  isCategoryChecked = (category: string): boolean => {
    return !!_.find(this.state.consentData, { category, accepted: true })
  }

  isConsentItemChecked = (type: string, tagId?: string): boolean => {
    return !!_.find(this.state.consentData, { type, tagId, accepted: true })
  }

  toggleAccordion = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    this.setState({ openPanel: isExpanded ? panel : null })
  }

  handleCategoryToggleChange = (category: string) => (_event: React.ChangeEvent<HTMLInputElement>, isOn: boolean) => {
    const { consentData } = this.state
    this.setState({
      consentData: _.map(consentData, (consentItem) => {
        const { accepted: isCurrentlyAccepted, category: itemCategory } = consentItem
        return { ...consentItem, accepted: category === itemCategory ? isOn : isCurrentlyAccepted }
      }),
    })
  }

  handleConsentItemToggleChange =
    (type: string, tagId?: string) => (_event: React.ChangeEvent<HTMLInputElement>, isOn: boolean) => {
      const { consentData } = this.state
      this.setState({
        consentData: _.map(consentData, (consentItem) => {
          const { accepted: isCurrentlyAccepted, type: itemType, tagId: itemTagId } = consentItem
          return { ...consentItem, accepted: type === itemType && tagId === itemTagId ? isOn : isCurrentlyAccepted }
        }),
      })
    }

  handleAcceptAllCLick = () => {
    this.props.acceptAllFunc!()
  }

  handleSaveClick = () => {
    const { saveConsentData } = this.props
    const updatedConsentData = _.map(this.state.consentData, (consentItem) => {
      const { accepted: isCurrentlyAccepted, category } = consentItem
      return { ...consentItem, accepted: !!isCurrentlyAccepted || category === DataSinkCategory.Essential }
    })
    saveConsentData!(updatedConsentData)
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
      <Accordion expanded={openPanel === panelName} onChange={this.toggleAccordion(panelName)} key={panelName}>
        {this.renderAccordionItemHeader(category)}
        {this.renderAccordionItemContent(accordionItemProps)}
      </Accordion>
    )
  }

  renderAccordionItemHeader(category: string) {
    return (
      <AccordionSummary>
        <StyledAccordionHeader>
          <h3>{category}</h3>
          {category !== DataSinkCategory.Essential && (
            <Switch
              checked={this.isCategoryChecked(category)}
              onChange={this.handleCategoryToggleChange(category)}
              onClick={(event) => {
                event.stopPropagation()
              }}
            />
          )}
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
        {_.map(dataSinks, ({ type, tagId, provider, purpose, category }) => {
          return (
            <TableContainer key={`${type}-${tagId ?? '%'}`}>
              <Table>
                <TableBody>
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
                        <Switch
                          checked={this.isConsentItemChecked(type, tagId)}
                          onChange={this.handleConsentItemToggleChange(type, tagId)}
                        />
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
                </TableBody>
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
            <Button type={ThemeButtonType.Success} onClick={this.handleAcceptAllCLick}>
              Alle akzeptieren
            </Button>
            <Button type={ThemeButtonType.Default} onClick={this.handleSaveClick}>
              Speichern
            </Button>
          </div>
          <div className="dataProtectionPanel__settings">{this.renderDataProtectionAccordion(dataSinks)}</div>
        </StyledDataProtectionPanel>
      </Section>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  dataSinks: selectDataSinks(state),
})

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, null, AnyAction>) => ({
  acceptAllFunc: () => {
    dispatch(acceptAll())
  },
  saveConsentData: (consentDataUpdate: DataProtectionConsentData) => {
    dispatch(updateDataProtectionConsent(consentDataUpdate))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(DataProtectionPanel)
