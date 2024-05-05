import React from "react"
import { graphql } from "gatsby"

import Layout from "../layouts/Layout"
import PageBooks from "../components/PageBooks"

const Books = ({ data, location }) => {
  const allBookCover = data.allBookCover.nodes
  const allBookChapter = data.allBookChapter.nodes

  return (
    <>
      <title>书籍 | Lorem314's Blog</title>
      <Layout location={location}>
        <PageBooks
          allBookCover={allBookCover}
          allBookChapter={allBookChapter}
        />
      </Layout>
    </>
  )
}

export default Books

export const query = graphql`
  query {
    allBookCover: allMdx(
      filter: { fields: { type: { eq: "TYPE_BOOK_COVER" } } }
    ) {
      nodes {
        id
        frontmatter {
          title
          subtitle
          isbn
          cover {
            childImageSharp {
              gatsbyImageData(width: 250)
            }
          }
        }
        body
        fields {
          type
          slug
        }
      }
    }

    allBookChapter: allMdx(
      filter: { fields: { type: { eq: "TYPE_BOOK_CHAPTER" } } }
    ) {
      nodes {
        frontmatter {
          title
          isbn
          chapter
        }
        fields {
          type
          slug
        }
      }
    }
  }
`
