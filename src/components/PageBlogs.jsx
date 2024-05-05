import React, { useState, useMemo, useCallback, useEffect } from "react"
import styled from "styled-components"

import Search from "./blogs/Search"
import Select from "./blogs/Select"
import PostList from "./blogs/PostList"
import AllTag from "./blogs/AllTag"

import Drawer from "../ui/Drawer"
import DrawerHead from "../styled/DrawerHead"

import useDebounce from "../hooks/useDebounce"

import { bp } from "../styled/GlobalStyle"

const Wrapper = styled.div`
  max-width: 72rem;
  margin: 2rem auto;

  display: grid;
  gap: 10px;
  grid-template-columns: 5fr 3fr;

  > .form-container {
    grid-column-start: 1;
    grid-column-end: 3;

    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  > .posts-container {
    grid-column-start: 1;
    grid-column-end: ${({
      $isRightDrawerAlwaysCollapsed,
      $isRightDrawerCollapsed,
    }) =>
      $isRightDrawerAlwaysCollapsed || $isRightDrawerCollapsed ? "3" : "2"};
  }
  > .tags-container {
    > .all-tag {
      padding: 0;
    }
  }

  @media screen and (max-width: ${bp.collapsePageBlogsRightDrawer}px) {
    > .form-container {
      display: flex;
      flex-direction: column;
    }
    > .posts-container {
      grid-column-start: 1;
      grid-column-end: 3;
    }
  }
`

const PageBlogs = ({
  allBlogPost,
  isRightDrawerAlwaysCollapsed,
  isRightDrawerCollapsed,
  isRightDrawerOpen,
  // openRightDrawer,
  closeRightDrawer,
}) => {
  const [posts, setPosts] = useState(allBlogPost)
  const [selectedTags, setSelectedTags] = useState([])
  const [isOrLogic, setIsOrLogic] = useState(true)
  const tags = useMemo(() => collectTags(allBlogPost), [allBlogPost])
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const handleSelectTag = useCallback(
    (tag) => (event) => {
      setSelectedTags((prevSelectedTags) => {
        const hasSelected = prevSelectedTags.includes(tag)
        if (hasSelected) {
          event.stopPropagation()
          return prevSelectedTags.filter((selectedTag) => selectedTag !== tag)
        } else {
          // console.log("not hasSelected", event)
          if (event.shiftKey) {
            console.log("shiftKey")
            return [...prevSelectedTags, tag]
          } else return [tag]
        }
      })
    },
    []
  )

  const clearSelectedTags = useCallback(() => setSelectedTags([]), [])

  const handleChangeSearchTerm = useCallback(
    (event) => setSearchTerm(event.target.value),
    []
  )

  const toggleFilterLogic = useCallback((event) => {
    event.stopPropagation()
    setIsOrLogic((_) => !_)
  }, [])

  const cachedAllTag = useMemo(
    () => (
      <AllTag
        tags={tags}
        selectedTags={selectedTags}
        onSelectTag={handleSelectTag}
      />
    ),
    [tags, selectedTags, handleSelectTag]
  )

  useEffect(() => {
    // setCurrentPage(1)
    setPosts(
      allBlogPost
        .filter((post) => {
          if (debouncedSearchTerm.length === 0) return true
          const lowercasedSearchTerm = debouncedSearchTerm.toLowerCase()
          const lowercasedTitle = post.frontmatter.title.toLowerCase()
          return lowercasedTitle.includes(lowercasedSearchTerm)
        })
        .filter((post) => {
          if (selectedTags.length === 0) return true
          return selectedTags
            .map((tag) => {
              return post.frontmatter.tags.includes(tag.name)
            })
            [isOrLogic ? "some" : "every"]((b) => b)
        })
    )
  }, [allBlogPost, debouncedSearchTerm, selectedTags, isOrLogic])

  return (
    <Wrapper
      $isRightDrawerAlwaysCollapsed={isRightDrawerAlwaysCollapsed}
      $isRightDrawerCollapsed={isRightDrawerCollapsed}
    >
      <section className="page-content form-container">
        <Search
          searchTerm={searchTerm}
          handleChangeSearchTerm={handleChangeSearchTerm}
        />
        <Select
          selectedTags={selectedTags}
          options={tags}
          onSelectTag={handleSelectTag}
          clearSelectedTags={clearSelectedTags}
          isOrLogic={isOrLogic}
          toggleFilterLogic={toggleFilterLogic}
        />
      </section>

      <section className="page-content posts-container">
        <h3 className="page-content-title">博客(999)</h3>
        <PostList posts={posts} />
      </section>

      {isRightDrawerAlwaysCollapsed || isRightDrawerCollapsed ? (
        <Drawer
          isOpen={isRightDrawerOpen}
          position="right"
          onClose={closeRightDrawer}
        >
          <DrawerHead position="right">
            <div>all tags title</div>
          </DrawerHead>
          {cachedAllTag}
        </Drawer>
      ) : (
        <section className="page-content tags-container">
          <h3 className="page-content-title">标签(999)</h3>
          {cachedAllTag}
        </section>
      )}
    </Wrapper>
  )
}

export default PageBlogs

const collectTags = (posts) => {
  const tagsObj = Object.fromEntries(
    posts.reduce((map, post) => {
      const tags = post?.frontmatter?.tags
      tags.forEach((tag) => {
        if (!map.has(tag)) {
          map.set(tag, 1)
        } else {
          const count = map.get(tag)
          map.set(tag, count + 1)
        }
      })
      return map
    }, new Map())
  )
  const tagObjArr = []
  for (const [name, count] of Object.entries(tagsObj)) {
    tagObjArr.push({ name, count })
  }
  return tagObjArr
}
