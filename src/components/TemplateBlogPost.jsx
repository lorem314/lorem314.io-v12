import React from "react"
import styled from "styled-components"
import { MDXProvider } from "@mdx-js/react"

import Actions from "./article/Actions"
import Body from "./article/Body"
import Head from "./blogs/Head"
import LinkedToc from "./article/LinkedToc"

import Drawer from "../ui/Drawer"

import getMetaData from "../utils/meta"
import { bp } from "../styled/GlobalStyle"

const Wrapper = styled.div`
  max-width: 72rem;
  margin: 2rem auto;

  display: grid;
  grid-template-columns: 2rem minmax(0, auto) minmax(0, 20rem);
  gap: 10px;

  > .actions {
    flex: 0 0 2rem;
  }

  > .toc-container {
    width: 100%;
    height: 100%;

    > .linked-toc {
      position: sticky;
      top: 10px;
      max-height: calc(100vh - 50px - 2rem - 10px);
    }
  }

  @media screen and (max-width: ${bp.collapseArticleRightDrawer}px) {
    grid-template-columns: 2rem minmax(0, auto);
  }
`

const TemplateBlogPost = ({
  blogPost,
  body,
  isRightDrawerAlwaysCollapsed,
  isRightDrawerCollapsed,
  isRightDrawerOpen,
  // openRightDrawer,
  closeRightDrawer,
}) => {
  // console.clear()
  // const meta = getMetaData(blogPost.body)
  // console.log({ meta })
  // console.log("[TemplateBlogPost] re-render")

  return (
    <Wrapper>
      <Actions />

      <article>
        <Head frontmatter={blogPost.frontmatter} />
        <Body body={body} />
      </article>

      {isRightDrawerAlwaysCollapsed || isRightDrawerCollapsed ? (
        <Drawer
          size="350px"
          isOpen={isRightDrawerOpen}
          position="right"
          onClose={closeRightDrawer}
        >
          <LinkedToc tableOfContents={blogPost.fields.tableOfContents} />
        </Drawer>
      ) : (
        <div className="toc-container">
          <LinkedToc tableOfContents={blogPost.fields.tableOfContents} />
        </div>
      )}
    </Wrapper>
  )
}

export default React.memo(TemplateBlogPost)
