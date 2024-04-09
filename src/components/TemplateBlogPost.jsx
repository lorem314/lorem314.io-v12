import React from "react"
import styled from "styled-components"

import { MDXProvider } from "@mdx-js/react"

const Wrapper = styled.div`
  max-width: 64rem;
  margin: 2rem auto;
`

const TemplateBlogPost = ({ blogPost, body }) => {
  // console.clear()
  // console.log("blog post body", blogPost.body)
  // const { totalWords } = estimateReadTime(blogPost.body)
  return (
    <Wrapper className="page-content">
      <MDXProvider components={{}}>{body}</MDXProvider>
    </Wrapper>
  )
}

export default TemplateBlogPost

const estimateReadTime = (body) => {
  const lines = body.split("\r\n")

  return lines.reduce(
    (result, line) => {
      if (isImport(line) || isJsxTag(line)) {
        return result
      } else {
        return { ...result, totalWords: result.totalWords + wordCount(line) }
      }
    },
    {
      totalWords: 0,
    }
  )
}

const isImport = (line) => {
  return line.startsWith("import")
}

const isJsxTag = (line) => {
  return line.startsWith("<") && line.endsWith(">")
}

const isImage = (line) => {
  return false
}

const wordCount = (str) => {
  const matches = str.match(/[\u00ff-\uffff]|\S+/g)
  return matches ? matches.length : 0
}
