import { linkResolver } from './LinkResolver'
import { PrismicRepositoryConfig } from 'gatsby-plugin-prismic-previews'

function createPrismicRepositoryConfig(): PrismicRepositoryConfig {
  if (process.env.GATSBY_PRISMIC_REPO_NAME) {
    return {
      repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
      // @ts-ignore
      accessToken: process.env.GATSBY_PRISMIC_API_KEY,
      releaseID: process.env.GATSBY_PRISMIC_RELEASE_ID,
      linkResolver,
    }
  }
  return {
    repositoryName: process.env.PRISMIC_REPO_NAME!,
    // @ts-ignore
    accessToken: process.env.PRISMIC_API_KEY,
    linkResolver,
  } //
}

export const previewConfig: PrismicRepositoryConfig = createPrismicRepositoryConfig()
