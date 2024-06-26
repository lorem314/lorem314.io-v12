/**
 * @type {import('gatsby').GatsbyConfig}
 */

const { remarkSandpack } = require("remark-sandpack")

module.exports = {
  trailingSlash: "never",
  siteMetadata: {
    title: `lorem314.io`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-styled-components",
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `published`, path: `${__dirname}/published/` },
      __key: "published",
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [],
        mdxOptions: {
          remarkPlugins: [remarkSandpack],
          rehypePlugins: [],
        },
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "images", path: "./src/images/" },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "pages", path: "./src/pages/" },
      __key: "pages",
    },
  ],
}
