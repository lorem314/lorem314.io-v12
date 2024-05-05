import React from "react"
import styled from "styled-components"

import BookCoverList from "./books/BookCoverList"

const Wrapper = styled.div`
  max-width: 64rem;
  margin: 2rem auto;
`

const PageBooks = ({ allBookCover = [], allBookChapter = [] }) => {
  const chaptersByIsbn = Object.groupBy(
    allBookChapter,
    (chapter) => chapter.frontmatter.isbn
  )

  console.log("chaptersByIsbn", chaptersByIsbn)

  return (
    <Wrapper className="page-content">
      <h3 className="page-content-title">书籍</h3>
      <BookCoverList
        bookCovers={allBookCover}
        chaptersByIsbn={chaptersByIsbn}
      />
    </Wrapper>
  )
}

export default PageBooks
