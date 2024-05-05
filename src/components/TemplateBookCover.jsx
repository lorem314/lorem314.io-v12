import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"

const Wrapper = styled.div`
  margin: 2rem auto;
  max-width: 32rem;

  > .book-cover-frontmatter {
    display: flex;
    gap: 10px;

    > .book-info {
      > .book-cover-subitle {
        color: var(--content-color-2);
      }
    }
  }

  > .chapter-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
`

const TemplateBookCover = ({ bookCover, bookChapters }) => {
  const coverImage = getImage(bookCover.frontmatter.cover)
  console.log("bookChapters", bookChapters)
  return (
    <Wrapper className="page-content">
      <h2 className="page-content-title">{bookCover.frontmatter.title}</h2>
      <div className="book-cover-frontmatter">
        <div className="cover-image-container">
          <GatsbyImage image={coverImage} alt="书籍封面" />
        </div>
        <div className="book-info">
          <h3>{bookCover.frontmatter.title}</h3>
          <h4 className="book-cover-subitle">
            {bookCover.frontmatter.subtitle}
          </h4>
          <p>ISBN:{bookCover.frontmatter.isbn}</p>
        </div>
      </div>

      <ul className="chapter-list">
        {bookChapters.map((bookChapter) => {
          const { tableOfContents } = bookChapter.fields
          const { chapter } = bookChapter.frontmatter
          const parsedToc = JSON.parse(tableOfContents)
          return (
            <li className="chapter-item" key={bookChapter.id}>
              <h3>
                <Link to={bookChapter.fields.slug}>
                  第 {chapter} 章 {bookChapter.frontmatter.title}
                </Link>
              </h3>
              <Items
                items={parsedToc.items}
                hrefPrefix={`/books/${bookCover.frontmatter.title}/第${chapter}章`}
                chapter={chapter}
              />
            </li>
          )
        })}
      </ul>
    </Wrapper>
  )
}

export default TemplateBookCover

const Items = ({ items = [], hrefPrefix = "", chapter }) => {
  return (
    <ul>
      {items.map((item, index) => {
        return (
          <li key={index}>
            <Item item={item} hrefPrefix={hrefPrefix} chapter={chapter} />
          </li>
        )
      })}
    </ul>
  )
}

const Item = ({ item, hrefPrefix = "", chapter }) => {
  const link = hrefPrefix + "#" + encodeURIComponent(item.title)

  if (!item.items) {
    return <Link to={link}>{item.title}</Link>
  } else {
    return (
      <>
        <li>
          <Link to={link}>{item.title}</Link>
        </li>
        <Items items={item.items} hrefPrefix={hrefPrefix} chapter={chapter} />
      </>
    )
  }
}
