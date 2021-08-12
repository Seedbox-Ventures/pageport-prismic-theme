import { linkResolver } from './LinkResolver'

let previewConfig

exports.previewConfig = () => {
  if (!previewConfig) {
    if (process.env.GATSBY_PRISMIC_REPO_NAME) {
      previewConfig = {
        repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
        accessToken: process.env.GATSBY_PRISMIC_API_KEY,
        linkResolver,
      }
    } else {
      previewConfig = { linkResolver } //
    }
  }
  return previewConfig
}
