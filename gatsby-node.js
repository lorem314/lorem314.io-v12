const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

const templateBlogPost = path.resolve("./src/templates/blog-post.jsx")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    const slug = createFilePath({ node, getNode })
    createNodeField({ node, name: "slug", value: slug })

    const splittedSlug = slug.split("/")
    console.log("[>>] splitted slug :", splittedSlug)

    const { totalWords, totalImages } = estimateReadTime(node.body)
    createNodeField({
      node,
      name: "statistic",
      value: {
        totalWords,
        totalImages,
      },
    })
    console.log("totalWords : ", totalWords)

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

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPosts = await graphql(`
    query {
      allMdx(filter: { fields: { type: { eq: "TYPE_BLOG_POST" } } }) {
        nodes {
          id
          fields {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)
  blogPosts.data?.allMdx.nodes.forEach((blogPost) => {
    const path = blogPost.fields.slug
    const contentFilePath = blogPost.internal.contentFilePath
    const component = `${templateBlogPost}?__contentFilePath=${contentFilePath}`
    const context = { id: blogPost.id }
    createPage({ path, component, context })
  })

  // to be continued ...
}

// helper
const estimateReadTime = (body) => {
  const lines = body.split("\r\n")

  return lines.reduce(
    (result, line) => {
      if (isImport(line) || isJsxTag(line)) {
        return result
      } else {
        return { ...result, totalWords: result.totalWords + wordCount(line) }
      }
    },
    {
      totalWords: 0,
      totalImages: 0,
    }
  )
}

const isImport = (line) => {
  return line.startsWith("import")
}

const isJsxTag = (line) => {
  return line.startsWith("<") && line.endsWith(">")
}

const isImage = (line) => {
  return false
}

const wordCount = (str) => {
  const matches = str.match(/[\u00ff-\uffff]|\S+/g)
  return matches ? matches.length : 0
}
