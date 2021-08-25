import { PrismicDocument } from '@prismicio/types'
import { LinkResolver } from 'prismic-reactjs'

const staticMapping: Record<string, string> = {
  index: '/',
}

export const linkResolver: LinkResolver = (doc: PrismicDocument) => {
  if (doc.type === 'page_dynamic') {

    return staticMapping[doc.uid!] ? staticMapping[doc.uid!] : `/${doc.uid}`
  }

  return '/'
}
