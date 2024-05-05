import React from "react"
import styled from "styled-components"

import BookCoverItem from "./BookCoverItem"

const Wrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-gap: 1rem;
`

const BookCoverList = ({ bookCovers = [], chaptersByIsbn }) => {
  return (
    <Wrapper className="none-style">
      {bookCovers.map((bookCover) => {
        return (
          <BookCoverItem
            key={bookCover.id}
            bookCover={bookCover}
            chaptersByIsbn={chaptersByIsbn}
          />
        )
      })}
    </Wrapper>
  )
}

export default BookCoverList
