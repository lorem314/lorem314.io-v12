import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"

const Wrapper = styled.li`
  display: flex;
  justify-content: center;

  > section {
    > .book-title {
      margin: 0.5rem 0;
      font-size: 1.25rem;
    }
    > .book-subtitle {
      margin: 0.5rem 0;
      text-align: right;
      font-size: 1.125rem;
      color: var(--content-color-2);
    }
    > .book-chapter-list {
      padding-left: 1.25rem;
      > li {
        > .chapter-title {
          margin: 0.25rem 0;
          font-size: 1rem;
        }
      }
    }
  }
`

const BookCoverItem = ({ bookCover, chaptersByIsbn }) => {
  const coverImage = getImage(bookCover.frontmatter.cover)
  const bookChapters = chaptersByIsbn[bookCover.frontmatter.isbn]

  return (
    <Wrapper>
      <section>
        <div className="cover-image-container">
          <GatsbyImage image={coverImage} alt="书籍封面" />
        </div>
        <h3 className="book-title">
          <Link to={bookCover.fields.slug}>{bookCover.frontmatter.title}</Link>
        </h3>
        <h4 className="book-subtitle">{bookCover.frontmatter.subtitle}</h4>
        <ul className="book-chapter-list">
          {bookChapters.map((bookChapter) => {
            return (
              <li key={bookChapter.id}>
                <h5 className="chapter-title">
                  <Link to={bookChapter.fields.slug}>
                    第 {bookChapter.frontmatter.chapter} 章{" "}
                    {bookChapter.frontmatter.title}
                  </Link>
                </h5>
              </li>
            )
          })}
        </ul>
      </section>
    </Wrapper>
  )
}

export default BookCoverItem
