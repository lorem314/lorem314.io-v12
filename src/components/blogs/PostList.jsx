import React from "react"
import styled from "styled-components"

import PostItem from "./PostItem"

const Wrapper = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const PostList = ({ posts = [] }) => {
  return (
    <Wrapper>
      {posts.map((post) => {
        return <PostItem key={post.id} post={post} />
      })}
    </Wrapper>
  )
}

export default PostList
