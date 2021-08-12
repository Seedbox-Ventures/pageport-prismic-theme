import { linkResolver } from './LinkResolver'

function generatePreviewConfig() {
  if (process.env.GATSBY_PRISMIC_REPO_NAME) {
    return {
      repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
      accessToken: process.env.GATSBY_PRISMIC_API_KEY,
      linkResolver,
    }
  }
  return { linkResolver } //

}

export const previewConfig = generatePreviewConfig()
