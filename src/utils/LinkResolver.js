// LinkResolver.js file

exports.linkResolver = (doc) => {
  if (doc.type === 'page_dynamic') {
    return `/${doc.uid}`
  }

  return '/'
}
