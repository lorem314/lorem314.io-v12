import React from "react"
import { graphql } from "gatsby"

import Layout from "../layouts/Layout"
import TemplateBookChapter from "../components/TemplateBookChapter"

const BookChapter = ({ location, data, children }) => {
  const bookCover = data.bookCover
  const bookChapter = data.bookChapter
  const bookChapters = data.bookChapters.nodes
  const { title, chapter } = bookChapter.frontmatter

  return (
    <>
      <title>
        第 {chapter} 章 {title} | {bookCover.frontmatter.title} | 书籍 |
        Lorem314's Blog
      </title>
      <Layout location={location}>
        <TemplateBookChapter
          location={location}
          bookChapter={bookChapter}
          bookChapters={bookChapters}
          body={children}
        />
      </Layout>
    </>
  )
}

export default BookChapter

export const query = graphql`
  query ($id: String, $isbn: String) {
    bookCover: mdx(
      frontmatter: { isbn: { eq: $isbn } }
      fields: { type: { eq: "TYPE_BOOK_COVER" } }
    ) {
      frontmatter {
        title
      }
    }

    bookChapter: mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
        isbn
        chapter
      }
      fields {
        tableOfContents
      }
    }

    bookChapters: allMdx(
      filter: {
        fields: { type: { eq: "TYPE_BOOK_CHAPTER" } }
        frontmatter: { isbn: { eq: $isbn } }
      }
      sort: { frontmatter: { chapter: ASC } }
    ) {
      nodes {
        frontmatter {
          title
          chapter
          isbn
        }
        fields {
          slug
        }
      }
    }
  }
`
