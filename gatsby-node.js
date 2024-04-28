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

    const { tableOfContents } = getMetaData(node.body)
    createNodeField({
      node,
      name: "tableOfContents",
      value: JSON.stringify(tableOfContents),
    })
    // console.log("totalWords : ", totalWords)

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

const getMetaData = (body) => {
  const meta = { count: { word: 0, image: 0, code: 0 }, tableOfContents: {} }
  const lines = body.split("\r\n")
  const sectionLines = []
  for (const line of lines) {
    if (line.length === 0) {
    } else if (isStaticImport(line)) {
    } else if (isClosingTag(line)) {
      if (line.startsWith("</Section")) sectionLines.push(line)
    } else if (isOpeningTag(line)) {
      if (line.startsWith("<Section")) sectionLines.push(line)
    } else if (false) {
    } else {
    }
  }
  const items = getItems(sectionLines)
  const tableOfContents = { items }
  meta.tableOfContents = tableOfContents
  return meta
}

const getItems = (lines) => {
  const items = []
  while (lines.length !== 0) {
    const line = lines.shift()
    if (line.startsWith("</")) {
      break
    } else {
      const matches = line.match(/title="(.*?)"/)
      const title = matches[1]
      const item = { title }
      items.push(item)
      item.items = getItems(lines)
    }
  }

  return items
}
const isStaticImport = (line) => {
  return line.startsWith("import")
}
const isClosingTag = (line, tagName) => {
  return line.startsWith(`</${tagName || ""}`)
}
const isOpeningTag = (line, tagName) => {
  if (!tagName) return new RegExp("^<[A-Z]").test(line)
  else return new RegExp(`^${"<"}${tagName}`).test(line)
}

// // helper

// const getMetaData = (body) => {
//   const lines = body.split("\r\n")

//   for (const line of lines) {
//     console.log("[line] ", line)
//   }
// }
// const isReactTag = (str) => {
//   // 只判定是否为 tag 不判定是否为 opening 还是 closing
//   // opening <CustomTag prop1={value1} prop2="value2">
//   // closing </CustomTag>
//   return false
// }
// const isOpeningTag = (str) => {
//   // 判定是否为 opening 标签
//   // <Opening>
//   return false
// }
// const isClosingTag = (str) => {
//   // 判定是否为 closing 标签
//   // </Closing>
//   return false
// }
// const extractPropsFromOpeningTag = (str) => {
//   return {}
// }

// // deprecated
// const estimateReadTime = (body) => {
//   const lines = body.split("\r\n")

//   return lines.reduce(
//     (result, line) => {
//       if (isImport(line) || isJsxTag(line)) {
//         return result
//       } else {
//         return { ...result, totalWords: result.totalWords + wordCount(line) }
//       }
//     },
//     {
//       totalWords: 0,
//       totalImages: 0,
//     }
//   )
// }

// const isImport = (line) => {
//   return line.startsWith("import")
// }

// const isJsxTag = (line) => {
//   return line.startsWith("<") && line.endsWith(">")
// }

// const isImage = (line) => {
//   return false
// }

// const wordCount = (str) => {
//   const matches = str.match(/[\u00ff-\uffff]|\S+/g)
//   return matches ? matches.length : 0
// }
