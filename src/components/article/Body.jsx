import React from "react"
import { MDXProvider } from "@mdx-js/react"
import styled from "styled-components"

const Wrapper = styled.div`
  padding: 1rem 1.5rem;
  background-color: var(--content-bg);

  & > section > h2 {
    margin-top: 1rem;
  }
`

const components = {}

const Body = ({ body }) => {
  return (
    <Wrapper>
      <MDXProvider components={components}>{body}</MDXProvider>
    </Wrapper>
  )
}

export default Body
