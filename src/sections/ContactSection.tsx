import React, { useState } from 'react'
import _ from 'lodash'
import tinycolor from 'tinycolor2'
import styled from 'styled-components'
import { StyleHelper, ThemeBackgroundColor, ThemeButtonType, ThemeColorType } from '../theme'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import Contact, { ContactProps } from '../modules/person/Contact'
import { SliceComponent, SliceData } from '../modules/page/SliceZone'
import Section from '../modules/page/Section'
import { SocialMediaPlatform } from '../modules/socialMedia/type'
import { PrismicHelper, PrismicLinkData } from '../utils/Prismic'
import { getImage, ImageDataLike } from 'gatsby-plugin-image'
import Form from '../modules/form/Form'
import FormTextField from '../modules/form/FormTextField'
import FormSubmit from '../modules/form/FormSubmit'
import FormCheckbox from '../modules/form/FormCheckbox'
import { graphql } from 'gatsby'
import { CircularProgress, IconButton } from '@mui/material'
import EmailService from '../services/EmailService'
import { Close } from '@mui/icons-material'
import { FormContextState } from '../modules/form/FormContext'

interface DataPrimary {
  background_color?: ThemeBackgroundColor
  button_style?: ThemeButtonType
  title?: { raw: RichTextBlock[] }
  text?: { raw: RichTextBlock[] }
  error_message?: { raw: RichTextBlock[] }
  thank_you_message?: { raw: RichTextBlock[] }
  data_protection_text?: { raw: RichTextBlock[] }
  contact_name?: string
  contact_image?: ImageDataLike
}

interface DataItem {
  contact_type: SocialMediaPlatform | 'Email'
  contact_link: PrismicLinkData
}

export interface ContactSectionProps {
  backgroundColor: ThemeBackgroundColor
  buttonStyle: ThemeButtonType
  errorMessage?: RichTextBlock[]
  title?: RichTextBlock[]
  text?: RichTextBlock[]
  thankYouMessage?: RichTextBlock[]
  dataProtectionText?: RichTextBlock[]
  contactProps: ContactProps
}

interface StyledContactSectionProps {
  backgroundColor: ThemeColorType
}

const StyledContactSection = styled.div<StyledContactSectionProps>(({ backgroundColor, theme }) => {
  const backgroundColorValue = theme.getColorValueByType(backgroundColor)
  const overlayBackgroundColorValue = tinycolor(backgroundColorValue).setAlpha(0.95).toRgbString()
  const loadingackgroundColorValue = tinycolor(backgroundColorValue).setAlpha(0.8).toRgbString()

  return `
  &.contactSection {
    display: grid;
    column-gap: 4rem;
    row-gap: 2rem;
    position: relative;
    box-sizing: content-box;
    ${StyleHelper.renderCssFromObject({ 'grid-template-columns': '1fr|1fr 1fr' })}
  }
  
  .contactSection {
    &__title {
      grid-row-start: 1;
      grid-row-end: 2;
      grid-column-start: 1;
      grid-column-end: 2;
      ${StyleHelper.renderCssFromObject({ 'margin-bottom': '1rem' })}
    }

    &__text {
      grid-row-start: 2;
      grid-row-end: 3;
      grid-column-start: 1;
      grid-column-end: 2;
    }

    &__contact {
      margin-top: 1rem;
      grid-row-start: 3;
      grid-row-end: 4;
      grid-column-start: 1;
      grid-column-end: 2;
    }

    &__form {
      position: relative;
      display: grid;
      row-gap: 1rem;
      ${StyleHelper.renderCssFromObject({
        'grid-row-start': '4|2',
        'grid-row-end': '5',
        'grid-column-start': '1|2',
        'grid-column-end': '2|3',
      })}
      
      [type=submit] {
        margin-top: 1rem;
      }
    }
    
    &__loadingOverlay {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: -1rem;
      bottom: -1rem;
      left: -1rem;
      right: -1rem;
      background: ${loadingackgroundColorValue};
      z-index: 1;
    }
    
    &__overlay {
      background: ${overlayBackgroundColorValue};
      position: absolute;
      display: flex;
      top: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 1;
      pointer-events: none;
      opacity: 0;
      transition: opacity 1s ease-in-out;
      text-align: center;
      
      &-visible {
        opacity: 1;
        pointer-events: auto;
      }
    }
    
    &__overlayClose {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
`
})

interface ContactSectionState {
  isLoading: boolean
  isSent: boolean
  error?: string
  success: boolean
  formValues: {
    name: string
    email: string
    message: string
    acceptAGBs: boolean
  }
}

const initialState: ContactSectionState = {
  isSent: false,
  isLoading: false,
  success: false,
  formValues: {
    name: '',
    email: '',
    message: 'My message',
    acceptAGBs: false,
  },
}

const ContactSection: SliceComponent<ContactSectionProps> = ({
  backgroundColor,
  buttonStyle,
  title,
  text,
  contactProps,
  dataProtectionText,
  thankYouMessage,
  errorMessage,
}) => {
  const [state, setState] = useState(initialState)
  const {
    error,
    isLoading,
    isSent,
    formValues: { name, email, message, acceptAGBs },
  } = state

  const onSubmit = async (_formValues: Record<string, any>, { reset: formValueReset }: FormContextState) => {
    setState({ ...state, isLoading: true })
    let error: string | undefined = undefined
    try {
      if (!(await EmailService.sendFormData())) {
        error = 'Could not send form data'
      }
    } catch (e) {
      error = e ?? 'Could not send form data'
    }

    if (!error && typeof formValueReset === 'function') {
      formValueReset()
    }

    setState({
      ...state,
      isLoading: false,
      error: error,
      isSent: true,
    })
  }

  const onCloseOverlay = () => {
    setState({ ...state, isSent: false, isLoading: false })
  }

  const onChangeValue = (name: string, value: any) => {
    const { formValues } = state
    setState({ ...state, formValues: { ...formValues, [name]: value } })
  }

  return (
    <Section backgroundColor={backgroundColor}>
      <StyledContactSection className={'contactSection'} backgroundColor={backgroundColor}>
        {title && (
          <div className="contactSection__title">
            <RichText render={title} />
          </div>
        )}
        {text && (
          <div className="contactSection__text">
            <RichText render={text} />
          </div>
        )}
        {contactProps && (
          <div className={'contactSection__contact'}>
            <Contact {...contactProps} />
          </div>
        )}
        <Form className="contactSection__form" onSubmit={onSubmit}>
          <FormTextField
            key={'name'}
            required
            label="Name"
            helperText={'Please provide your name'}
            onChange={(e) => {
              onChangeValue('name', e.currentTarget.value)
            }}
            value={name}
          />
          <FormTextField
            key={'email'}
            required
            label="E-Mail-Adresse"
            helperText={'Please provide your e-mail address'}
            type={'email'}
            value={email}
            onChange={(e) => {
              onChangeValue('email', e.currentTarget.value)
            }}
          />
          <FormTextField
            key={'message'}
            required
            label="Nachricht"
            multiline
            rows={6}
            helperText={'Please write a message'}
            value={message}
            onChange={(e) => {
              onChangeValue('message', e.currentTarget.value)
            }}
          />
          {dataProtectionText && (
            <FormCheckbox
              required
              name="acceptAGB"
              checked={acceptAGBs}
              onChange={(e) => {
                onChangeValue('acceptAGB', e.currentTarget.checked)
              }}
              label={<RichText render={dataProtectionText} />}
            />
          )}

          <FormSubmit themeType={buttonStyle}>Nachricht absenden</FormSubmit>
          {isLoading && (
            <div className={'contactSection__loadingOverlay'}>
              <CircularProgress />
            </div>
          )}
        </Form>
        {
          <div className={'contactSection__overlay' + (isSent ? ' contactSection__overlay-visible' : '')}>
            <RichText render={error ? errorMessage : thankYouMessage} />
            <IconButton onClick={onCloseOverlay} className={'contactSection__overlayClose'}>
              <Close />
            </IconButton>
          </div>
        }
      </StyledContactSection>
    </Section>
  )
}

ContactSection.mapDataToProps = (data: SliceData<DataPrimary, DataItem>) => {
  const {
    background_color,
    button_style,
    contact_name,
    contact_image,
    text,
    title,
    data_protection_text,
    thank_you_message,
    error_message,
  } = data.primary
  const { items: repeatables = [] } = data
  const image = contact_image ? getImage(contact_image) : undefined
  return {
    buttonStyle: button_style ?? ThemeButtonType.Default,
    backgroundColor: background_color ?? ThemeColorType.BackgroundDefault,
    title: title?.raw,
    text: text?.raw,
    thankYouMessage: thank_you_message?.raw,
    errorMessage: error_message?.raw,
    contactProps: {
      name: contact_name,
      contactLinks: _.map(repeatables, ({ contact_type, contact_link }) => {
        return {
          mediaType: contact_type,
          ...PrismicHelper.prismicLinkToLinkProps(contact_link),
        }
      }),
      image: image
        ? {
            alt: contact_name ?? '',
            width: '90px',
            image,
          }
        : undefined,
    },
    dataProtectionText: data_protection_text?.raw,
  }
}

export default ContactSection

export const query = graphql`
  fragment PageDynamicDataBodyContact on PrismicPageDynamicDataBodyContact {
    id
    primary {
      background_color
      button_style
      contact_name
      contact_image {
        alt
        gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
      }
      logo {
        alt
        gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
      }
      text {
        html
        raw
        text
      }
      title {
        html
        raw
        text
      }
      thank_you_message {
        html
        raw
        text
      }
      error_message {
        html
        raw
        text
      }
      data_protection_text {
        html
        raw
        text
      }
    }
    items {
      contact_type
      contact_link {
        url
        target
        type
        link_type
      }
    }
  }
`
