import React from "react"
import { graphql } from "gatsby"

import Layout from "../layouts/Layout"
import TemplateBlogPost from "../components/TemplateBlogPost"

const BlogPost = ({ data, location, children }) => {
  const blogPost = data.blogPost
  const { title } = blogPost.frontmatter

  return (
    <Layout location={location}>
      <TemplateBlogPost
        blogPost={blogPost}
        body={children}
        location={location}
      />
    </Layout>
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
        statistic {
          totalWords
        }
      }
      body
      tableOfContents
    }
  }
`
