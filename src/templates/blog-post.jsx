import React from "react"
import { graphql } from "gatsby"

import Layout from "../layouts/Layout"
import TemplateBlogPost from "../components/TemplateBlogPost"

const BlogPost = ({ data, location, children }) => {
  const blogPost = data.blogPost
  const { title } = blogPost.frontmatter

  return (
    <>
      <title>{title} | 书籍 | Lorem314's Blog</title>
      <Layout location={location}>
        <TemplateBlogPost
          location={location}
          blogPost={blogPost}
          body={children}
        />
      </Layout>
    </>
  )
}

export default BlogPost

export const query = graphql`
  query ($id: String) {
    blogPost: mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
        tags
        createdAt
      }
      fields {
        slug
        type
        tableOfContents
      }
      body
      tableOfContents
    }
  }
`
