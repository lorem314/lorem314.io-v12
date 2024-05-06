const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
// const { getMetaData } = require("./src/utils/meta")
const templateBlogPost = path.resolve("./src/templates/blog-post.jsx")
const templateBookCover = path.resolve("./src/templates/book-cover.jsx")
const templateBookChapter = path.resolve("./src/templates/book-chapter.jsx")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    const slug = createFilePath({ node, getNode })
    createNodeField({ node, name: "slug", value: slug })

    const splittedSlug = slug.split("/")
    console.log("[>>] splitted slug :", splittedSlug)

    const { tableOfContents } = getMetaData(node.body)
    console.log("toc", tableOfContents)
    createNodeField({
      node,
      name: "tableOfContents",
      value: JSON.stringify(tableOfContents),
    })

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

  const allBookCover = await graphql(`
    query {
      allMdx(filter: { fields: { type: { eq: "TYPE_BOOK_COVER" } } }) {
        nodes {
          id
          frontmatter {
            isbn
          }
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
  allBookCover.data?.allMdx.nodes.forEach((bookCover) => {
    createPage({
      path: bookCover.fields.slug,
      component: `${templateBookCover}?__contentFilePath=${bookCover.internal.contentFilePath}`,
      context: { id: bookCover.id, isbn: bookCover.frontmatter.isbn },
    })
  })

  const allBookChapter = await graphql(`
    query {
      allMdx(filter: { fields: { type: { eq: "TYPE_BOOK_CHAPTER" } } }) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            isbn
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)
  allBookChapter.data?.allMdx.nodes.forEach((bookChapter) => {
    const id = bookChapter.id
    const isbn = bookChapter.frontmatter.isbn
    createPage({
      path: bookChapter.fields.slug,
      component: `${templateBookChapter}?__contentFilePath=${bookChapter.internal.contentFilePath}`,
      context: { id, isbn },
    })
  })

  // to be continued ...
}

const getMetaData = (body) => {
  const meta = { count: { word: 0, image: 0, code: 0 }, tableOfContents: {} }
  const lines = body.split("\r\n")
  console.log(
    "[getMetaData] inspect body line by line, lines.length",
    lines.length
  )
  const sectionLines = []
  for (const line of lines) {
    console.log("[line]", line)
    if (line.length === 0) {
    } else if (isStaticImport(line)) {
    } else if (isClosingTag(line)) {
      if (line.startsWith("</Section")) {
        console.log("closing tag, push to array")
        sectionLines.push(line)
      }
    } else if (isOpeningTag(line)) {
      if (line.startsWith("<Section")) {
        console.log("opening tag, push to array")
        sectionLines.push(line)
      }
    } else if (false) {
    } else {
    }
  }
  console.log("finished, sectionLines", sectionLines)
  const items = getItems(sectionLines)
  const tableOfContents = { items }
  meta.tableOfContents = tableOfContents
  return meta
}

const getItems = (lines) => {
  const items = []
  console.log("getItems run")
  while (lines.length !== 0) {
    const line = lines.shift()
    if (line.startsWith("</")) {
      console.log("start line")
      break
    } else {
      console.log("else")
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
