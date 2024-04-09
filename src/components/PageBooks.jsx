import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  max-width: 64rem;
  margin: 2rem auto;
`

const PageBooks = () => {
  return (
    <Wrapper className="page-content">
      <h3 className="page-content-title">书籍</h3>
      <div>page book</div>
    </Wrapper>
  )
}

export default PageBooks
