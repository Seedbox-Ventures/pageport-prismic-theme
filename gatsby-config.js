module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-ts-config', options: {
        configDir: `${process.cwd()}/gatsby-config`,
      },
    },
  ],
}
