const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    const slug = createFilePath({ node, getNode })
    createNodeField({ node, name: "slug", value: slug })

    const splittedSlug = slug.split("/")
    console.log("[>>] splitted slug :", splittedSlug)

    if (splittedSlug.length === 4 && splittedSlug.includes("blogs")) {
      createNodeField({ node, name: "type", value: "TYPE_BLOG_POST" })
    } else if (splittedSlug.length === 4 && splittedSlug.includes("books")) {
      createNodeField({ node, name: "type", value: "TYPE_BOOK_COVER" })
    } else if (splittedSlug.length === 5 && splittedSlug.includes("books")) {
      createNodeField({ node, name: "type", value: "TYPE_BOOK_CHAPTER" })
    } else {
      // createNodeField({ node, name: "type", value: "NaT" })
    }
  }
}
