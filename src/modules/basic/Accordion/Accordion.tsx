import React, { PureComponent, ReactElement, ReactNode } from 'react'
import styled from 'styled-components'
import { AccordionConsumer, AccordionProvider } from './AccordionContext'

const StyledAccordion = styled.div``

export interface AccordionProps {
  children: Array<ReactElement<AccordionItemProps> | undefined>
}

interface AccordionState {}

class Accordion extends PureComponent<AccordionProps, AccordionState> {
  render = () => {
    const { children } = this.props
    return (
      <AccordionProvider>
        <StyledAccordion>{children}</StyledAccordion>
      </AccordionProvider>
    )
  }
}

export default Accordion

export type AccordionItemHeaderRenderer = () => ReactNode

export interface AccordionItemProps {
  key: string
  header: AccordionItemHeaderRenderer | ReactNode
}

export class AccordionItem extends PureComponent<AccordionItemProps> {
  render() {
    const { header, children, key } = this.props
    console.log('HEADER', header)
    return (
      <AccordionConsumer>
        {({ openItemKey, toggleItem }) => (
          <div className="accordionItem">
            <div
              className="accordionItem__header"
              onClick={() => {
                toggleItem(key)
              }}
            >
              {typeof header === 'function' ? header() : header}
            </div>
            <div className={`accordionItem__content${openItemKey === key ? ' accordionItem__content--open' : ''}`}>
              {children}
            </div>
          </div>
        )}
      </AccordionConsumer>
    )
  }
}
