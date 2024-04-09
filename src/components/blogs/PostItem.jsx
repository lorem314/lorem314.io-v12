import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Tags from "./Tags"
import { formateDate } from "../../utils/formatter"

const Wrapper = styled.li`
  > article {
    > header {
      > .post-title {
        font-size: 1.25rem;
        margin: 0;
      }
      > .tags {
        font-size: 87.5%;
      }
      > .post-created-at {
        color: var(--content-color-3);
        margin: 0.25rem 0;
      }
    }
  }
`

const PostItem = ({ post }) => {
  return (
    <Wrapper>
      <article>
        <header>
          <h4 className="post-title">
            <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
          </h4>
          <Tags tags={post.frontmatter.tags} />
          <div className="post-created-at">
            <span>发布于 {formateDate(post.frontmatter.createdAt)}</span>
            <span> · </span>
            <span>约 {post.fields.statistic.totalWords} 字</span>
          </div>
        </header>
      </article>
    </Wrapper>
  )
}

export default PostItem
