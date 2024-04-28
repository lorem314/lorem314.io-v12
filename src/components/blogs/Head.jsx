import React from "react"
import styled from "styled-components"

import Tags from "./Tags"
import { H1 } from "../../html/headings"

const Wrapper = styled.header`
  margin-bottom: 1rem;
  padding: 10px 1.5rem;
  background-color: var(--content-bg);
`

const Head = ({ frontmatter }) => {
  return (
    <Wrapper>
      <H1>{frontmatter.title}</H1>
      <Tags tags={frontmatter.tags} />
    </Wrapper>
  )
}

export default Head
