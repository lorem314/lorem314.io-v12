import React from "react"
import styled from "styled-components"

const Wrapper = styled.header`
  margin-bottom: 1rem;
  padding: 10px 1.5rem;
  background-color: var(--content-bg);

  > .chapter-title {
    display: flex;
    flex-direction: column;
    text-align: right;
    color: var(--content-color-0);

    > .frontmatter-chapter {
      padding-bottom: 0.25rem;
      border-bottom: 1px solid var(--content-color-0);
    }
    > .frontmatter-title {
      padding-top: 0.25rem;
    }
  }
`

const Head = ({ frontmatter }) => {
  return (
    <Wrapper>
      <h1 className="chapter-title">
        <span className="frontmatter-chapter">第 {frontmatter.chapter} 章</span>
        <span className="frontmatter-title">{frontmatter.title}</span>
      </h1>
    </Wrapper>
  )
}

export default Head
