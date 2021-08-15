import React from 'react'
import { Link } from 'gatsby'
import { linkResolver } from './LinkResolver'

export const CustomLink = (_type: any, element: any, content: any, _children: React.ReactNode, _index: any) => {
  if (element.data.link_type === 'Document') {
    return (
      <Link to={linkResolver(element.data)} key={element.data.id}>
        {content}
      </Link>
    )
  }

  if (element.data.link_type === 'Web') {
    return (
      <a id={element.data.id} href={element.data.url}>
        {content}
      </a>
    )
  }
  return null
}

