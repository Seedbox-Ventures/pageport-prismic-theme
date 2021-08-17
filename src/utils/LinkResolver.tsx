import { PrismicDocument } from '@prismicio/types'
import { LinkResolver } from 'prismic-reactjs'

export const linkResolver:LinkResolver = (doc: PrismicDocument) => {
  if (doc.type === 'page_dynamic') {
    return `/${doc.uid}`
  }

  return '/'
}
