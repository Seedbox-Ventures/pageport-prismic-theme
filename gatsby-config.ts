const _ = require('lodash')
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const { breakpoints: pageportBreakpoints } = require('./pageport-config')
const breakPoints = _.map(pageportBreakpoints, (nextBreakPoint: number) => (nextBreakPoint))

export default {
  siteMetadata: {
    title: 'Gatsby + Prismic Tutorial',
    description: 'Learn how to integrate Prismic into your Gatsby project.',
  },
  plugins: [
    'gatsby-plugin-ts-config',
    {
      resolve: 'gatsby-plugin-prismic-previews',
      options: {
        repositoryName: process.env.PRISMIC_REPO_NAME,
        accessToken: process.env.PRISMIC_API_KEY,
      },
    },
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: process.env.PRISMIC_REPO_NAME,
        accessToken: process.env.PRISMIC_API_KEY,
        releaseID: process.env.PRISMIC_RELEASE_ID,
        linkResolver: require('./src/utils/LinkResolver').linkResolver,
        schemas: {
          page_dynamic: require('./custom_types/page_dynamic.json'),
          page_imprint: require('./custom_types/page_imprint.json'),
          page_legal: require('./custom_types/page_legal.json'),
          header: require('./custom_types/header.json'),
          theme: require('./custom_types/theme.json'),
        },
      },
    },
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          breakPoints,
          backgroundColor: `transparent`,
        },
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/favicon.png',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [`Lato\:400,400,700,700i,900`, `Amiri\:400,400,700,700i`],
      },
    },
  ],
}
