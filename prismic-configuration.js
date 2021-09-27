require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  apiEndpoint: `https://${process.env.PRISMIC_REPO_NAME}.prismic.io/api/v2`,
}
