import React from 'react'
import _ from 'lodash'
import { ThemeBackgroundColor, ThemeColorType } from '../theme'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import styled from 'styled-components'
import Contact, { ContactProps } from '../modules/person/Contact'
import { SliceComponent, SliceData } from '../modules/page/SliceZone'
import Section from '../modules/page/Section'
import { graphql } from 'gatsby'
import { SocialMediaPlatform } from '../modules/socialMedia/type'
import { PrismicHelper, PrismicLinkData } from '../utils/Prismic'
import { getImage, ImageDataLike } from 'gatsby-plugin-image'
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'

interface DataPrimary {
  background_color?: ThemeBackgroundColor
  title?: { raw: RichTextBlock[] }
  text?: { raw: RichTextBlock[] }
  contact_name?: string
  contact_image?: ImageDataLike
}

interface DataItem {
  contact_type: SocialMediaPlatform | 'Email'
  contact_link: PrismicLinkData
}

export interface ContactSectionProps {
  backgroundColor: ThemeBackgroundColor
  title?: RichTextBlock[]
  text?: RichTextBlock[]
  contactProps: ContactProps
}

const StyledContactSection = styled.div`
  display: grid;
  column-gap: 1rem;
  row-gap: 1rem;
  
  .contentSection {
    &__form {
      display: flex;
      flex-direction: column;
    }
  }
`

const ContactSection: SliceComponent<ContactSectionProps> = ({ backgroundColor, title, text, contactProps }) => {
  return (
    <Section backgroundColor={backgroundColor}>
      <StyledContactSection className={'contactSection'}>
        {title && (
          <div className="contentSection__title">
            <RichText render={title} />
          </div>
        )}
        {text && (
          <div className="contentSection__text">
            <RichText render={text} />
          </div>
        )}
        {contactProps && (
          <div className={'contactSection__contact'}>
            <Contact {...contactProps} />
          </div>
        )}
        <form className="contentSection__form">
          <TextField required label="Name" />
          <TextField required label="E-Mail-Adresse" />
          <TextField required label="Nachricht" multiline rows={4} />
          <FormControlLabel control={<Checkbox />} label="Datenschutzlabel" />
          <Button>Nachricht absenden</Button>
        </form>
      </StyledContactSection>
    </Section>
  )
}

ContactSection.mapDataToProps = (data: SliceData<DataPrimary, DataItem>) => {
  const { background_color, contact_name, contact_image, text, title } = data.primary
  const { items: repeatables = [] } = data
  const image = contact_image ? getImage(contact_image) : undefined
  return {
    backgroundColor: background_color ?? ThemeColorType.BackgroundDefault,
    title: title?.raw,
    text: text?.raw,
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
  }
}

export default ContactSection

export const query = graphql`
  fragment PageDynamicDataBodyContact on PrismicPageDynamicDataBodyContact {
    id
    primary {
      background_color
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
