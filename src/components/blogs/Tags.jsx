import React from "react"
import styled from "styled-components"

const Wrapper = styled.ul.attrs({
  className: "tags",
})`
  list-style-type: none;
  margin: 0.5rem 0;
  padding: 0;

  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  > li {
    line-height: 1.5;

    border-radius: 0.25rem;
    border: 1px solid var(--ui-text-input-border-color);
    padding: 0.25rem 0.5rem;
  }
`

const Tags = ({ tags = [] }) => {
  return (
    <Wrapper>
      {tags.map((tag, index) => {
        return <li key={index}>{tag}</li>
      })}
    </Wrapper>
  )
}

export default Tags
